const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'winnerModel',
    default: null,
  },
  // This field determines which model the winner references
  winnerModel: {
    type: String,
    required: function() { return this.winner != null; },
    enum: ['User', 'Bot']
  },
  start: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;