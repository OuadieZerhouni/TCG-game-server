const BattleSession = require("./BattleSession");

class BattleSessionManager {
    static findBattleSessionById(battleSessionId) {
        return BattleSession.findBattleSessionById(battleSessionId);
    }

    static findBattleSessionByPlayerId(playerId) {
        return BattleSession.findBattleSessionByPlayerId(playerId);
    }

    static deleteBattleSessionById(roomId) {
        BattleSession.deleteBattleSessionById(roomId);
    }
}

module.exports = BattleSessionManager;