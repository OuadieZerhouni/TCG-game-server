/**
 * @interface IBattleStrategy
 */
class IBattleStrategy {
    /**
     * @function handleTurn
     * @param {BattleSession} battleSession - The battle session object.
     * @param {string} playerId - The ID of the player whose turn it is.
     */
    handleTurn(battleSession, playerId) {
        throw new Error("handleTurn method must be implemented");
    }

    /**
     * @function processAction
     * @param {BattleSession} battleSession - The battle session object.
     * @param {object} action - The action to process.
     */
    processAction(battleSession, action) {
        throw new Error("processAction method must be implemented");
    }
}

export default IBattleStrategy;