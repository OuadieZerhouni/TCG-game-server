const ICommand = require('./ICommand');
const BattleSessionManager = require('../BattleSessionManager');
const GameEngine = require('../GameEngine');

class DrawCardCommand extends ICommand {
    constructor(socketHandler, payload) {
        super();
        this.socketHandler = socketHandler;
        this.socket = payload.socket;
    }

    execute() {
        try {
            if (!this.socketHandler.validateUserSession(this.socket)) return;

            const battleSession = BattleSessionManager.findBattleSessionByPlayerId(this.socket.user._id);
            if (!battleSession) {
                console.error(`User ${this.socket.user._id} is not in a room`);
                return;
            }

            const drawnCard = GameEngine.drawCard(battleSession, this.socket.user._id);
            if (!drawnCard) {
                console.error(`User ${this.socket.user._id} could not draw a card`);
                return;
            }

            this.socketHandler.actionEmitter.emitDrawAction(this.socket, battleSession, this.socket.user._id, drawnCard);
        } catch (err) {
            console.error(err);
            this.socket.emit('commandFailed', { command: 'DrawCard', error: err.message });
        }
    }
}

module.exports = DrawCardCommand;