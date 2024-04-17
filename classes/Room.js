/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const Player = require("./Player");

class Room {
  static rooms = [];

  constructor(
    Id,
    player1_id,
    player2_id,
    turn,
    duration,
    startDate,
    deck1,
    deck2,
    blood1,
    blood2
  ) {
    this.Id = Id;
    this.player1 = new Player(player1_id, deck1, blood1);
    this.player2 = new Player(player2_id, deck2, blood2);
    this.turn = turn;
    this.duration = duration;
    this.startDate = startDate;
    Room.rooms.push(this);
  }

  /**
   *
   * @param {String} Id
   * @returns {Room} the room with the given Id
   */
  static findRoomById(Id) {
    return Room.rooms.find((room) => room.Id === Id);
  }
}

module.exports = Room;
