const mongoose = require('mongoose');

/**
 * Represents a user's level in the game.
 *
 * @class Profile
 */
const levelSchema = new mongoose.Schema({

    /**
     * The major level of something.
     * @type {Number}
     * @required
     */
    majorLevel: {
        type: Number,
        required: true,
    },

    /**
     * The minor level of something.
     * @type {Number}
     * @required
     */
    minorLevel: {
        type: Number,
        required: true,
    },

    /**
     * The diamond reward for completing the level.
     * @type {Number}
     * @required
     * @default 0
     */
    diamondReward: {
        type: Number,
        required: true,
        default: 0,
    },

    /**
     * The gold reward for completing the level.
     * @type {Number}
     * @required
     * @default 100
     */
    goldReward: {
        type: Number,
        required: true,
        default: 100,
    },

    /**
     * The deck associated with the level.
     *
     * @property {Deck} deck
     */
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
  },


  /**
   * A quote associated with the level.
   *
   * @property {string} quote
   */
  quote: {
    type: String,
  },


  /**
   * An array of equipment IDs associated with the level.
   *
   * @property {Equipment[]} equipments
   */
  equipments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
});

/**
 * The Profile model.
 *
 * @typedef {Model<Profile>} ProfileModel
 */
const Level = mongoose.model('Profile', levelSchema);

module.exports = Level;
