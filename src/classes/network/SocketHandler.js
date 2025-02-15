const BattleSession = require("../battle/BattleSession");
const BotHandler = require("../battle/BotHandler");
const Player = require("../battle/Player");
const GameEngine = require("../battle/GameEngine");
const { checkJwtSocket } = require("../../middlewares/authMiddleware");
const roomService = require('../../services/roomService');
const ActionEmitter = require('./ActionEmitter');
const BattleSessionManager = require('../battle/BattleSessionManager');

class SocketHandler {
    constructor(io) {
        this.io = io;
        this.botHandler = new BotHandler(io);
        this.gameEngine = new GameEngine();
        this.actionEmitter = new ActionEmitter(io);
        this.rooms = {};
        this.disconnectTimers = new Map(); // Track disconnect timers for auto-surrender
    }

    initializeSocketEvents() {
        this.io.use((socket, next) => {
            checkJwtSocket(socket, next);
        });

        this.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            socket.on("joinBattle", (roomId) => this.handleJoinBattle(socket, roomId));
            socket.on("playCardRequest", (userCard) => this.handlePlayCardToFieldRequest(socket, userCard));
            socket.on("readyForBattle", () => this.handleReadyForBattleRequest(socket));
            socket.on("disconnect", () => {
                this.handleDisconnect(socket);
                this.handleLeaveRequest(socket, socket.user._id);
            });
            socket.on("attackCardRequest", (userCard) => this.handleAttackCardRequest(socket, userCard));
            socket.on("surrenderRequest", () => this.handleSurrenderRequest(socket, socket.user._id));
        });
    }

    /**
     * Joins a user to a battle session.
     * @param {Socket} socket - The socket object of the user.
     * @param {string} battleSessionId - The ID of the battle session to join.
     */
    handleJoinBattle(socket, battleSessionId) {
        try {
            if (!this.validateUserSession(socket)) return;

            const battleSession = BattleSessionManager.findBattleSessionById(battleSessionId);
            if (!battleSession) {
                this.handleRoomNotFound(socket, battleSessionId);
                return;
            }

            socket.join(battleSessionId);
            console.log(`++++++++++++ User ${socket.id} joining room ${battleSessionId}`);

            this.actionEmitter.emitInitialGameData(socket, battleSession);
            this.clearAutoSurrenderTimer(socket.user._id);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Handles user disconnection.
     * @param {Socket} socket - The socket object of the disconnected user.
     */
    handleDisconnect(socket) {
        console.log(`User disconnected: ${socket.id}`);
        const userId = socket.user._id;
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(userId);

        if (battleSession) {
            battleSession.readyPlayers = battleSession.readyPlayers.filter((id) => id !== userId);
            this.setAutoSurrenderTimer(socket, userId);
        }
    }

    /**
     * Handles game over logic.
     * @param {Player} winner - The winning player.
     * @param {BattleSession} battleSession - The battle session that ended.
     */
    handleGameOver(winner, battleSession) {
        if (!winner) return; // No winner yet

        this.actionEmitter.emitBattleEndAction(battleSession, winner.id);
        this.saveBattleResult(battleSession, winner);
        this.clearRoomData(battleSession.id);
    }

    /**
     * Handles a card attack request from a user.
     * @param {Socket} socket - The socket object of the user.
     * @param {object} userCard - The card used for the attack.
     */
    handleAttackCardRequest(socket, userCard) {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(socket.user._id);
        if (!battleSession) {
            console.error(`User ${socket.user._id} is not in a room`);
            return;
        }

        const [attackerCard, attackedCard] = this.gameEngine.attackCard(battleSession, socket.user._id, userCard.cardId);
        if (!attackedCard) {
            console.error(`User ${socket.user._id} could not attack card ${userCard.cardId}`);
            return;
        }

        this.actionEmitter.emitAttackActions(socket, battleSession, attackerCard, attackedCard);

        if (!battleSession.isPvP) {
            this.handleBotTurn(socket, battleSession);
        }

        this.checkAndHandleGameOver(socket, battleSession);
    }

    /**
     * Handles a card draw request from a user.
     * @param {Socket} socket - The socket object of the user.
     * @param {string} playerId - The ID of the player drawing the card.
     * @returns {object|undefined} - The drawn card object, or undefined if drawing failed.
     */
    handleDrawCardRequest(socket, playerId) {
        console.log(`User ${playerId} is drawing a card`);
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(playerId);
        if (!battleSession) {
            console.error(`User ${playerId} is not in a room`);
            return;
        }
        console.log(`User ${playerId} is drawing a card in room ${battleSession.id}`);

        const drawnCard = this.gameEngine.drawCard(battleSession, playerId);
        if (!drawnCard) {
            console.error(`User ${playerId} could not draw a card`);
            return;
        }

        this.actionEmitter.emitDrawAction(socket, battleSession, playerId, drawnCard);
        return drawnCard;
    }

    /**
     * Handles a request to play a card to the field.
     * @param {Socket} socket - The socket object of the user.
     * @param {object} userCard - The card to be played.
     */
    handlePlayCardToFieldRequest(socket, userCard) {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(socket.user._id);
        if (!battleSession) {
            console.error(`User ${socket.user._id} is not in a room`);
            return;
        }

        const playedCard = this.gameEngine.playCardToField(battleSession, socket.user._id, userCard.cardId);
        if (!playedCard) {
            console.error(`User ${socket.user._id} could not play card ${userCard.cardId}`);
            return;
        }

        this.actionEmitter.emitPlayAction(socket, battleSession, playedCard);

        if (!battleSession.isPvP) {
            this.handleBotTurn(socket, battleSession);
            this.handleDrawCardRequest(socket, socket.user._id);
        } else {
            this.handleDrawCardRequest(socket, battleSession.getNextPlayerId(socket.user._id));
        }
    }

    /**
     * Handles a ready for battle request from a user.
     * @param {Socket} socket - The socket object of the user.
     */
    handleReadyForBattleRequest(socket) {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(socket.user._id);
        if (!battleSession) {
            console.error(`User ${socket.user._id} is not in a room`);
            return;
        }
        console.log(`User ${socket.user._id} is ready for battle`);

        battleSession.readyPlayers.push(socket.user._id);
        console.log(`Battle session ${battleSession.id} ready players: ${battleSession.readyPlayers.length}/${battleSession.isPvP ? 2 : 1}`);
        console.log(`Battle session ${battleSession.id} is PvP: ${battleSession.isPvP}`);
        console.log(`Battle session ${battleSession.id} ready players list: ${battleSession.readyPlayers}`);
        if ((battleSession.isPvP && battleSession.readyPlayers.length === 2) || (!battleSession.isPvP && battleSession.readyPlayers.length === 1)) {
            this.handleDrawCardRequest(socket, socket.user._id);
        }
    }

    /**
     * Handles a surrender request from a user.
     * @param {Socket} socket - The socket object of the user.
     * @param {string} userId - The ID of the user who surrendered.
     */
    handleSurrenderRequest(socket, userId) {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(userId);
        if (!battleSession) {
            console.error(`User ${userId} is not in any battle session`);
            return;
        }

        const winner = battleSession.player1.id === userId ? battleSession.player2 : battleSession.player1;

        console.log(`User ${userId} surrendered.`);
        this.actionEmitter.emitSurrenderAction(battleSession, userId);
        this.handleGameOver(winner, battleSession);
    }

    /**
     * Handles a leave request from a user.
     * @param {Socket} socket - The socket object of the user.
     * @param {string} userId - The ID of the user who surrendered.
     */
    handleLeaveRequest(socket, userId) {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(userId);
        if (!battleSession) {
            console.error(`User ${userId} is not in any battle session`);
            return;
        }

        const winner = battleSession.player1.id === userId ? battleSession.player2 : battleSession.player1;

        console.log(`User ${userId} left.`);
        // Don't emit the surrender action to all players in the battle room
        this.handleGameOver(winner, battleSession);
    }

    /**
     * Validates the user session.
     * @private
     * @param {Socket} socket - The socket object of the user.
     * @returns {boolean} - True if the session is valid, false otherwise.
     */
    validateUserSession(socket) {
        if (!socket?.user?._id) {
            socket.emit('error', { message: 'Invalid user session' });
            return false;
        }
        return true;
    }

    /**
     * Handles the event when a room is not found.
     * @private
     * @param {Socket} socket - The socket object of the user.
     * @param {string} battleSessionId - The ID of the battle session that was not found.
     */
    handleRoomNotFound(socket, battleSessionId) {
        socket.emit("roomNotFound", battleSessionId);
        console.error(`BattleSession ${battleSessionId} not found for user ${socket.id}`);
    }

    /**
     * Clears the auto-surrender timer for a user.
     * @private
     * @param {string} userId - The ID of the user.
     */
    clearAutoSurrenderTimer(userId) {
        if (this.disconnectTimers.has(userId)) {
            clearTimeout(this.disconnectTimers.get(userId));
            this.disconnectTimers.delete(userId);
            console.log(`Cleared auto-surrender timer for user ${userId}`);
        }
    }

    /**
     * Sets the auto-surrender timer for a user.
     * @private
     * @param {Socket} socket - The socket object of the user.
     * @param {string} userId - The ID of the user.
     */
    setAutoSurrenderTimer(socket, userId) {
        if (!this.disconnectTimers.has(userId)) {
            const timeoutId = setTimeout(() => {
                console.log(`User ${userId} timed out. Automatically surrendering.`);
                this.handleSurrenderRequest(socket, userId);
                this.disconnectTimers.delete(userId);
            }, 20 * 1000);
            this.disconnectTimers.set(userId, timeoutId);
        }
    }

    /**
     * Saves the battle result to the database.
     * @private
     * @param {BattleSession} battleSession - The battle session that ended.
     * @param {Player} winner - The winning player.
     */
    saveBattleResult(battleSession, winner) {
        const duration = Date.now() - battleSession.startDate.getTime();
        const winnerId = winner.id;
        const winnerModel = winner.constructor.name;

        roomService.updateRoom(battleSession.id, winnerId, winnerModel, duration)
            .catch(err => console.error('Failed to save battle result:', err));
    }

    /**
     * Clears the room data after a battle.
     * @private
     * @param {string} roomId - The ID of the room to clear.
     */
    clearRoomData(roomId) {
        BattleSessionManager.deleteBattleSessionById(roomId);
        this.io.in(roomId).socketsLeave(roomId);
    }

    /**
     * Handles the bot's turn in a PvE battle.
     * @private
     * @param {Socket} socket - The socket object of the user.
     * @param {BattleSession} battleSession - The battle session object.
     */
    handleBotTurn(socket, battleSession) {
        this.handleDrawCardRequest(socket, battleSession.player2.id);
        const botActionArray = this.botHandler.handleBotTurn(battleSession);
        this.io.to(battleSession.id).emit("actions", botActionArray);
    }

    /**
     * Checks if the game is over and handles the game over logic.
     * @private
     * @param {Socket} socket - The socket object of the user.
     * @param {BattleSession} battleSession - The battle session object.
     */
    checkAndHandleGameOver(socket, battleSession) {
        if (battleSession.player1.isLost()) {
            this.handleGameOver(battleSession.player2, battleSession);
        } else if (battleSession.player2.isLost()) {
            this.handleGameOver(battleSession.player1, battleSession);
        } else {
            this.handleDrawCardRequest(socket, socket.user._id);
        }
    }
}

module.exports = SocketHandler;