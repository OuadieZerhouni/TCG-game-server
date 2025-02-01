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
    this.currentTurnPlayerId = this.chooseFirstPlayer();
    Room.rooms.push(this);
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
}

module.exports = Room;