const BattleSession = require("./BattleSession");

class BattleSessionManager {
    static findBattleSessionById(battleSessionId) {
        return BattleSession.findBattleSessionById(battleSessionId);
    }
    /**
     * Finds a battle session by player ID.
     * @param {string} playerId - The ID of the player to search for.
     * @returns {BattleSession|null} - The battle session the player is in or null if not found.
     */
    static findBattleSessionByPlayerId(playerId) {
        return BattleSession.findBattleSessionByPlayerId(playerId);
    }

    static deleteBattleSessionById(roomId) {
        BattleSession.deleteBattleSessionById(roomId);
    }
}

module.exports = BattleSessionManager;