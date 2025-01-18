const Player = require('./Player.js');
class Room {
  static rooms = [];

  constructor(id, player1Id, player2Id, turn, duration, startDate, deck1, deck2, blood1, blood2, isPvP = true) {
    this.id = id;
    this.player1 = new Player(player1Id, deck1, blood1);
    this.player2 = new Player(player2Id, deck2, blood2);
    this.turn = turn;
    this.duration = duration;
    this.startDate = startDate;
    this.isPvP = isPvP;
    this.readyPlayers = [];
    this.currentTurnPlayerId = this.chooseFirstPlayer(); // Track whose turn it is
    Room.rooms.push(this);
  }

  attackCard(playerId, cardId) {
    const [attackerPlayer, attackedPlayer] = this.player1.id === playerId ? [this.player1, this.player2] : [this.player2, this.player1];
    const attackerCard = attackerPlayer.field.filter((card) => card.id === cardId)[0];
    if (!attackerCard) {
      console.error(`Player ${playerId} could not find card ${cardId} to attack`);
      return null;
    }
    // index of the attacked card
    const attackedCard = attackedPlayer.takeAttack(attackerCard.attack, attackerPlayer.getCardIndexOnField(cardId));

    return [attackerCard, attackedCard];
    
  }

  chooseFirstPlayer() {
    return Math.random() < 0.5 ? this.player1.id : this.player2.id;
  }

  static findRoomById(id) {
    return Room.rooms.find((room) => room.id === id) || null;
  }

  static deleteRoomById(id) {
    Room.rooms = Room.rooms.filter((room) => room.id !== id);
  }

  static findRoomByPlayerId(playerId) {
    return Room.rooms.find(
      (room) => room.player1.id === playerId || room.player2.id === playerId
    ) || null;
  }

  playCardToField(playerId, cardId) {
    const player = this.player1.id === playerId ? this.player1 : this.player2;
    const playedCard = player.playCardToField(cardId);
    if (playedCard) {
      this.endTurn(); // End turn after a card is played
    }
    return playedCard;
  }

  drawCard(playerId) {
    const player = this.player1.id === playerId ? this.player1 : this.player2;
    return player.drawCard();
  }

  endTurn() {
    // Toggle the current turn player
    this.currentTurnPlayerId = this.currentTurnPlayerId === this.player1.id ? this.player2.id : this.player1.id;
  }

  getCurrentPlayerId() {
    return this.currentTurnPlayerId;
  }

  isBotTurn() {
    return !this.isPvP && this.currentTurnPlayerId === this.player2.id;
  }
}


module.exports = Room;
