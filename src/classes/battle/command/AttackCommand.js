const ICommand = require('./ICommand');
const BattleSessionManager = require('../BattleSessionManager');
const BattleSession = require('../BattleSession');
const SocketHandler = require('../../network/SocketHandler');
const GameEngine = require('../GameEngine');

class AttackCommand extends ICommand {
    /**
     * Creates an instance of AttackCommand.
     * @param {SocketHandler} socketHandler - The socket handler instance managing socket connections.
     * @param {Object} payload - The payload object containing connection details.
     * @param {Socket} payload.socket - The socket connection for the client.
     * @param {Object} payload.attackData - The attack data object.
     * @param {string} payload.attackData.cardId - The unique identifier for the attacking card.
     */
    constructor(socketHandler, payload) {
        super();
        this.socketHandler = socketHandler;
        this.socket = payload.socket;
        this.attackData = payload.attackData;
    }

    execute() {
        try {
            if (!this.socketHandler.validateUserSession(this.socket)) return;

            const battleSession = BattleSessionManager.findBattleSessionByPlayerId(this.socket.user._id);
            if (!battleSession) {
                console.error(`User ${this.socket.user._id} is not in a room`);
                return;
            }

            const [attackerCard, attackedCard] = GameEngine.attackCard(
                battleSession,
                this.socket.user._id,
                this.attackData.cardId
            );

            if (!attackerCard || !attackedCard) {
                console.error(`Attack failed for user ${this.socket.user._id} with card ${this.attackData.cardId}`);
                return;
            }

            this.socketHandler.actionEmitter.emitAttackActions(this.socket, battleSession, attackerCard, attackedCard);

            if (!this.socketHandler.checkAndHandleGameOver(this.socket, battleSession)) {
                this.socketHandler.handleBotTurn(this.socket, battleSession);
      if (!this.socketHandler.checkAndHandleGameOver(this.socket, battleSession)) 

                this.socketHandler.handleDrawCardRequest(this.socket, this.socket.user._id);
            } else {
                this.socketHandler.handleDrawCardRequest(
                    this.socket,
                    battleSession.currentTurnPlayerId
                );
            }
        } catch (err) {
            console.error(err);
            this.socket.emit('commandFailed', { command: 'Attack', error: err.message });
        }
    }
}

module.exports = AttackCommand;