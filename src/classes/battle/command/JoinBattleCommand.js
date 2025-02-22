const ICommand = require('./ICommand');
const BattleSessionManager = require('../BattleSessionManager');

class JoinBattleCommand extends ICommand {
    constructor(
        socketHandler,
        socket,
        battleSessionId
    ) {
        super();
        this.socketHandler = socketHandler;
        this.socket = socket;
        this.battleSessionId = battleSessionId;
    }

    execute() {
        try {
            if (!this.socketHandler.validateUserSession(this.socket)) return;

            const battleSession = BattleSessionManager.findBattleSessionById(this.battleSessionId);
            if (!battleSession) {
                this.socketHandler.handleRoomNotFound(this.socket, this.battleSessionId);
                return;
            }

            this.socket.join(this.battleSessionId);
            console.log(`++++++++++++ User ${this.socket.id} joining room ${this.battleSessionId}`);

            this.socketHandler.actionEmitter.emitInitialGameData(this.socket, battleSession);
            this.socketHandler.clearAutoSurrenderTimer(this.socket.user._id);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = JoinBattleCommand;