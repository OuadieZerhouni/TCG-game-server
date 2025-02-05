/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const mongoose = require('mongoose');

/**
 * Represents a game room.
 *
 * @class Room
 */
const roomSchema = new mongoose.Schema({
  /**
   * Array of players in the room
   * @property {Array<mongoose.Types.ObjectId>} players
   * @required
   */
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],

  /**
   * The index of winning player in players array. -1 for draw.
   * @property {Number} winner
   * @required
   */
  winner: {
    type: Number,
    required: true,
    default: -1,
    validate: {
      validator: function(v) {
        return v >= -1 && v < this.players.length;
      },
      message: 'Winner index must be valid player index or -1 for draw'
    }
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
