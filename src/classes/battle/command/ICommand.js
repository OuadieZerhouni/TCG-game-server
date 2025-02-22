/**
 * @interface ICommand
 */
class ICommand {
    /**
     * @function execute
     * @param {...any} args - Arguments for the command
     */
    execute(...args) {
        throw new Error("execute method must be implemented");
    }
}

module.exports = ICommand;