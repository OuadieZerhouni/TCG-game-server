import IBattleStrategy from './IBattleStrategy.js';

class PvPBattleStrategy extends IBattleStrategy {
    handleTurn(battleSession, playerId) {
        // PvP specific turn logic
        console.log(`PvP turn for player ${playerId} in battle ${battleSession.id}`);
    }

    processAction(battleSession, action) {
        // PvP specific action processing
        console.log(`PvP action processed in battle ${battleSession.id}`, action);
    }
}

export default PvPBattleStrategy;