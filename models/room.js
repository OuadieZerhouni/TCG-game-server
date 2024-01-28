/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const mongoose = require('mongoose');

/**
 * Represents a game room.
 *
 * @class Room
 */
const roomSchema = new mongoose.Schema({
  /**
   * The first player in the room.
   *
   * @property {mongoose.Types.ObjectId} player1
   * @required
   */
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * The second player in the room.
   *
   * @property {mongoose.Types.ObjectId} player2
   * @required
   */
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  /**
   * The winner of the game. Use 0 for a draw.
   *
   * @property {Number} winner
   * @required
   */
  winner: {
    type: Number,
    required: true,
  },

  /**
   * The timestamp when the game started.
   *
   * @property {Date} start
   * @required
   */
  start: {
    type: Date,
    required: true,
  },

  /**
   * The duration of the game in milliseconds.
   *
   * @property {Number} duration
   * @required
   */
  duration: {
    type: Number,
    required: true,
  },
});

/**
 * The Room model.
 *
 * @typedef {Model<Room>} RoomModel
 */
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
