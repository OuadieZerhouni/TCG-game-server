const BattleSession = require('./BattleSession');

class GameEngine {
  constructor() {
    this.battleSessions = BattleSession.sessionList;
  }

  attackCard(battleSession, playerId, cardId) {
    const [attackerPlayer, attackedPlayer] = battleSession.player1.id === playerId
      ? [battleSession.player1, battleSession.player2]
      : [battleSession.player2, battleSession.player1];
    const attackerCard = attackerPlayer.field.filter((card) => card.id === cardId)[0];
    if (!attackerCard) {
      console.error(`Player ${playerId} could not find card ${cardId} to attack`);
      return null;
    }
    // Instead of ending the turn inside GameEngine, we let ActionEmitter handle it
    const attackedCard = attackedPlayer.takeAttack(attackerCard.attack, attackerPlayer.getCardIndexOnField(cardId));
    // Removed: this.nextPlayerTurn(battleSession);
    return [attackerCard, attackedCard];
  }

  playCardToField(battleSession, playerId, cardId) {
    const player = battleSession.player1.id === playerId ? battleSession.player1 : battleSession.player2;
    const playedCard = player.playCardToField(cardId);
    if (playedCard) {
      // Removed: this.nextPlayerTurn(battleSession);
    }
    return playedCard;
  }

  drawCard(battleSession, playerId) {
    const player = battleSession.player1.id === playerId ? battleSession.player1 : battleSession.player2;
    return player.drawCard();
  }

  isBotTurn(battleSession) {
    return !battleSession.isPvP && battleSession.currentTurnPlayerId === battleSession.player2.id;
  }
}

module.exports = GameEngine;