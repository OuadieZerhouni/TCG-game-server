const JoinBattleCommand = require('./JoinBattleCommand');
const PlayCardCommand = require('./PlayCardCommand');
// const DrawCardCommand = require('./DrawCardCommand');
// const AttackCommand = require('./AttackCommand');
class CommandFactory {
    constructor(socketHandler) {
        this.socketHandler = socketHandler;
    }

    createCommand(commandName, ...args) {
        switch (commandName) {
            case 'JoinBattle':
                const [joinSocket, battleSessionId] = args;
                return new JoinBattleCommand(this.socketHandler, joinSocket, battleSessionId);
            case 'PlayCard':
                const [playSocket, userCard] = args;
                return new PlayCardCommand(this.socketHandler, playSocket, userCard);
            case 'DrawCard':
                const [drawSocket] = args;
                return new DrawCardCommand(this.socketHandler, drawSocket);
            case 'Attack':
                const [attackSocket, attackData] = args;
                return new AttackCommand(this.socketHandler, attackSocket, attackData);
            default:
                throw new Error(`Unknown command: ${commandName}`);
        }
    }
}

module.exports = CommandFactory;