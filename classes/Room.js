/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const Player = require("./Player");

/**
 * Represents a game room.
 * @class
 */
class Room {
  static rooms = [];

  /**
   * Creates a new instance of the Room class.
   * @constructor
   * @param {String} Id - The room ID.
   * @param {String} player1_id - The ID of player 1.
   * @param {String} player2_id - The ID of player 2.
   * @param {Number} turn - The current turn number.
   * @param {Number} duration - The duration of the game.
   * @param {Date} startDate - The start date of the game.
   * @param {Array} deck1 - The deck of player 1.
   * @param {Array} deck2 - The deck of player 2.
   * @param {Number} blood1 - The blood of player 1.
   * @param {Number} blood2 - The blood of player 2.
   */
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
   * Finds a room by its ID.
   * @static
   * @param {String} Id - The ID of the room.
   * @returns {Room} The room with the given ID.
   */
  static findRoomById(Id) {
    return Room.rooms.find((room) => room.Id === Id);
  }

  /**
   * Deletes a room by its ID.
   * @static
   * @param {String} Id - The ID of the room.
   */
  static deleteRoomById(Id) {
    Room.rooms = Room.rooms.filter((room) => room.Id !== Id);
  }

  /**
   * Finds a room by player ID.
   * @static
   * @param {String} Id - The ID of the player.
   * @returns {Room} The room with the given player ID.
   */
  static findRoomByPlayerId(Id) {
    return Room.rooms.find(
      (room) => room.player1.id === Id || room.player2.id === Id
    );
  }
}

module.exports = Room;
