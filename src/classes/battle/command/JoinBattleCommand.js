const ICommand = require('./ICommand');
const BattleSessionManager = require('../BattleSessionManager');
const SocketHandler = require('../../network/SocketHandler');

class JoinBattleCommand extends ICommand {
    /**
     * Creates an instance of JoinBattleCommand.
     * @param {SocketHandler} socketHandler - The socket handler instance managing socket connections.
     * @param {Object} payload - The payload object containing connection details.
     */
    constructor(socketHandler, payload) {
        super();
        this.socketHandler = socketHandler;
        this.socket = payload.socket;
        this.battleSessionId = payload.roomId;
    }

    execute() {
        try {
            if (!this.socketHandler.validateUserSession(this.socket)) return;

            const battleSession = BattleSessionManager.findBattleSessionById(this.battleSessionId);
            if (!battleSession) {
                this.socket.emit("roomNotFound", this.battleSessionId);
                console.error(`BattleSession ${this.battleSessionId} not found for user ${this.socket.id}`);
                return;
            }

            this.socket.join(this.battleSessionId);
            console.log(`++++++++++++ User ${this.socket.id} joining room ${this.battleSessionId}`);

            this.socketHandler.actionEmitter.emitInitialGameData(this.socket, battleSession);
            this.socketHandler.clearAutoSurrenderTimer(this.socket.user._id);
        } catch (err) {
            console.error(err);
            this.socket.emit('commandFailed', { command: 'JoinBattle', error: err.message });
        }
    }
}

module.exports = JoinBattleCommand;