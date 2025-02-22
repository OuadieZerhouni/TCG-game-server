const BattleSessionManager = require('../BattleSessionManager');
const ICommand = require('./ICommand');

class PlayCardCommand extends ICommand {
    constructor(socketHandler, socket, userCard) {
        super();
        this.socketHandler = socketHandler;
        this.socket = socket;
        this.userCard = userCard;
    }

    execute() {
        const battleSession = BattleSessionManager.findBattleSessionByPlayerId(this.socket.user._id);
        if (!battleSession) {
            console.error(`User ${this.socket.user._id} is not in a room`);
            return;
        }

        const playedCard = this.socketHandler.gameEngine.playCardToField(
            battleSession, 
            this.socket.user._id, 
            this.userCard.cardId
        );

        if (!playedCard) {
            console.error(`User ${this.socket.user._id} could not play card ${this.userCard.cardId}`);
            return;
        }

        this.socketHandler.actionEmitter.emitPlayAction(this.socket, battleSession, playedCard);

        if (!battleSession.isPvP) {
            this.socketHandler.handleBotTurn(this.socket, battleSession);
            this.socketHandler.handleDrawCardRequest(this.socket, this.socket.user._id);
        } else {
            this.socketHandler.handleDrawCardRequest(
                this.socket, 
                battleSession.getNextPlayerId(this.socket.user._id)
            );
        }
    }
}

module.exports = PlayCardCommand;