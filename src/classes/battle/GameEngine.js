const Room = require('./BattleSession');

class GameEngine {
  constructor() {
    this.rooms = Room.sessionList;
  }

  attackCard(room, playerId, cardId) {
    const [attackerPlayer, attackedPlayer] = room.player1.id === playerId ? [room.player1, room.player2] : [room.player2, room.player1];
    const attackerCard = attackerPlayer.field.filter((card) => card.id === cardId)[0];
    if (!attackerCard) {
      console.error(`Player ${playerId} could not find card ${cardId} to attack`);
      return null;
    }
    const attackedCard = attackedPlayer.takeAttack(attackerCard.attack, attackerPlayer.getCardIndexOnField(cardId));
    return [attackerCard, attackedCard];
  }

  playCardToField(room, playerId, cardId) {
    const player = room.player1.id === playerId ? room.player1 : room.player2;
    const playedCard = player.playCardToField(cardId);
    if (playedCard) {
      this.endTurn(room);
    }
    return playedCard;
  }

  drawCard(room, playerId) {
    const player = room.player1.id === playerId ? room.player1 : room.player2;
    return player.drawCard();
  }

  endTurn(room) {
    room.currentTurnPlayerId = room.currentTurnPlayerId === room.player1.id ? room.player2.id : room.player1.id;
  }

  getCurrentPlayerId(room) {
    return room.currentTurnPlayerId;
  }

  isBotTurn(room) {
    return !room.isPvP && room.currentTurnPlayerId === room.player2.id;
  }
}

module.exports = GameEngine;