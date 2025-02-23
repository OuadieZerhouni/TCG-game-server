const JoinBattleCommand = require('./JoinBattleCommand');
const PlayCardCommand = require('./PlayCardCommand');
const DrawCardCommand = require('./DrawCardCommand');
const AttackCommand = require('./AttackCommand');

class CommandFactory {
    constructor(socketHandler) {
        this.socketHandler = socketHandler;
    }

    createCommand(commandName, payload) {
        switch (commandName) {
            case 'JoinBattle':
                return new JoinBattleCommand(this.socketHandler, payload);
            case 'PlayCard':
                return new PlayCardCommand(this.socketHandler, payload);
            case 'DrawCard':
                return new DrawCardCommand(this.socketHandler, payload);
            case 'Attack':
                return new AttackCommand(this.socketHandler, payload);
            default:
                throw new Error(`Unknown command: ${commandName}`);
        }
    }
}

module.exports = CommandFactory;