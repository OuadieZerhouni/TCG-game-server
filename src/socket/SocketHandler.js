const BattleSession = require("../classes/battle/BattleSession");
// const BattleSession   = require("../classes/battle/BattleSession");
const BotHandler = require("../classes/battle/BotHandler");
const Player = require("../classes/battle/Player");
const GameEngine = require("../classes/battle/GameEngine");
const { checkJwtSocket } = require("../middlewares/authMiddleware");
const roomService = require('../services/roomService');

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.botHandler = new BotHandler(io);
    this.gameEngine = new GameEngine();
    this.rooms = {};
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
      socket.on("disconnect", () => this.handleDisconnect(socket));
      socket.on("attackCardRequest", (userCard) => this.handleAttackCardRequest(socket, userCard));
    });
  }

  handleJoinBattle(socket, battleSessionId) {
    try {
      if (!socket?.user?._id) {
        socket.emit('error', { message: 'Invalid user session' });
        return;
      }
      /** @var {BattleSession} */
      const battleSession = BattleSession.findBattleSessionById(battleSessionId);
      if (!battleSession) {
        socket.emit("roomNotFound", battleSessionId);
        console.error(`BattleSession ${battleSessionId} not found for user ${socket.id}`);
        return;
      }
      socket.join(battleSessionId);
      console.log(`++++++++++++ User ${socket.id} joining room ${battleSessionId}`);

      const gameData = {
        deck1: battleSession.player1.deck.cards,
        deck2: battleSession.player2.deck.cards,
        initialData: true,
        localPlayerId: socket.user._id,
        OpponentId: (battleSession.player1.id === socket.user._id ? battleSession.player2.id : battleSession.player1.id).toString(),
      };

      socket.emit("initialAction", gameData);
    }
    catch (err) {
      console.error(err);
    }
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
    const battleSession = BattleSession.findBattleSessionByPlayerId(socket.user._id);
    if (battleSession) {
      battleSession.readyPlayers = battleSession.readyPlayers.filter((id) => id !== socket.user._id);
      if (battleSession.readyPlayers.length === 0) {
        BattleSession.deleteBattleSessionById(battleSession.id);
      }
    }
  }
  /**
     *
     * @param {Socket} socket
     * @param {Player} winner
     * @param {BattleSession} battleSession
     * @returns
     */
  handleGameOver(socket, winner, battleSession) {
    // Determine winner based on blood points
    if (!winner) return; // No winner yet

    // Create battle end action
    const battleEndAction = {
      turn: battleSession.turn,
      actionType: "gameOver",
      playerId: winner.id,
    };

    // Emit battle end to all players in room
    this.io.to(battleSession.id).emit("actions", [battleEndAction]);

    // Save result to database
    const duration = Date.now() - battleSession.startDate.getTime();
    const winnerId = winner.id; // Get the winner's ID
    const winnerModel = winner.constructor.name; // Get the winner's model name ("Player" or "Bot")

    // Update room in database
    roomService.updateRoom(battleSession.id, winnerId, winnerModel, duration)
      .catch(err => console.error('Failed to save battle result:', err));

    // Clear room data
    BattleSession.deleteBattleSessionById(battleSession.id);
    this.io.in(battleSession.id).socketsLeave(battleSession.id);

  }

  handleAttackCardRequest(socket, userCard) {
    /** @type {BattleSession} */
    const battleSession = BattleSession.findBattleSessionByPlayerId(socket.user._id);
    if (!battleSession) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }

    const [attackerCard, attackedCard] = this.gameEngine.attackCard(battleSession, socket.user._id, userCard.cardId);
    if (!attackedCard) {
      console.error(`User ${socket.user._id} could not attack card ${userCard.cardId}`);
      return;
    }

    const attackAction = {
      turn: battleSession.turn++,
      actionType: "attackCard",
      playerId: socket.user._id,
      initiatorCard: attackerCard,
      targetCardList: [attackedCard],
    };
    this.io.to(battleSession.id).emit("actions", [attackAction]);

    if (attackedCard.blood == 0) {
      const killAction = {
        turn: battleSession.turn,
        actionType: "killCard",
        playerId: socket.user._id,
        targetCardList: [attackedCard],
      };
      this.io.to(battleSession.id).emit("actions", [killAction]);
    }

    if (!battleSession.isPvP) {
      const botDrawnCard = this.handleDrawCardRequest(socket, battleSession.player2.id);
      const botActionArray = this.botHandler.handleBotTurn(battleSession);
      this.io.to(battleSession.id).emit("actions", botActionArray);
    }
    // Check if battle should end after attack
    if (battleSession.player1.isLost()) {
      this.handleGameOver(socket, battleSession.player2, battleSession);
    }
    else if (battleSession.player2.isLost()) {
      this.handleGameOver(socket, battleSession.player1, battleSession);
    }
    else {
      this.handleDrawCardRequest(socket, socket.user._id);
    }
  }

  handleDrawCardRequest(socket, playerId) {
    console.log(`User ${playerId} is drawing a card`);
    /** @type {BattleSession} */
    const battleSession = BattleSession.findBattleSessionByPlayerId(playerId);
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

    const drawAction = {
      turn: battleSession.turn++,
      actionType: "drawCard",
      playerId: playerId,
      initiatorCard: drawnCard,
    };
    console.log(`Emitting draw action to room ${battleSession.id}`);
    //  log all io rooms and their clients
    this.io.to(battleSession.id).emit("actions", [drawAction]);

    return drawnCard;
  }

  handlePlayCardToFieldRequest(socket, userCard) {
    const battleSession = BattleSession.findBattleSessionByPlayerId(socket.user._id);
    if (!battleSession) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }

    const playedCard = this.gameEngine.playCardToField(battleSession, socket.user._id, userCard.cardId);
    if (!playedCard) {
      console.error(`User ${socket.user._id} could not play card ${userCard.cardId}`);
      return;
    }

    const playAction = {
      turn: battleSession.turn,
      actionType: "playCard",
      playerId: socket.user._id,
      initiatorCard: playedCard,
    };
    this.io.to(battleSession.id).emit("actions", [playAction]);

    if (!battleSession.isPvP) {
      const botDrawnCard = this.handleDrawCardRequest(socket, battleSession.player2.id);
      const botActionArray = this.botHandler.handleBotTurn(battleSession);
      this.io.to(battleSession.id).emit("actions", botActionArray);
      this.handleDrawCardRequest(socket, socket.user._id);
    } else {
      this.handleDrawCardRequest(socket, battleSession.getNextPlayerId(socket.user._id));
    }
  }

  handleReadyForBattleRequest(socket) {
    /** @type {BattleSession} */
    const battleSession = BattleSession.findBattleSessionByPlayerId(socket.user._id);
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
}

module.exports = SocketHandler;