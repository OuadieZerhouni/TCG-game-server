/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Represents a user of the game.
 *
 * @class User
 */
const userSchema = new mongoose.Schema({
  /**
   * The email address of the user.
   *
   * @property {string} email
   * @required
   */
  email: {
    type: String,
    required: false,
    unique: true,
  },

  /**
   * The username of the user.
   *
   * @property {string} username
   * @required
   */
  username: {
    type: String,
    required: true,
    unique: true,
  },

  /**
   * The password of the user.
   *
   * @property {string} password
   * @required
   */
  password: {
    type: String,
    required: true,
  },

  /**
   * The level of the user.
   *
   * @property {number} level
   */
  level: {
    type: Number,
  },

  /**
   * The experience points (XP) of the user.
   *
   * @property {number} xp
   */
  xp: {
    type: Number,
  },

  /**
   * An array of user IDs representing friends of the user.
   *
   * @property {string[]} friends
   */
  friends: {
    type: [String],
  },

  /**
   * The avatar URL of the user.
   *
   * @property {string} avatar
   */
  avatar: {
    type: String,
  },
    /**
     * The deck associated with the user.
     *
     * @property {Deck} deck
     */
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deck',
    },
  
    /**
     * The kingdom ID associated with the user (nullable).
     *
     * @property {string|null} kingdomId
     */
    kingdomId: {
      type: String,
      default: null,
    },
  
    /**
     * The rank of the user's user.
     *
     * @property {string} rank
     */
    rank: {
      type: Number,
    },
  
    /**
     * A quote associated with the user.
     *
     * @property {string} quote
     */
    quote: {
      type: String,
    },
  
    /**
     * The amount of in-game diamonds held by the user.
     *
     * @property {number} diamondAmount
     */
    diamondAmount: {
      type: Number,
    },
  
    /**
     * The amount of in-game gold held by the user.
     *
     * @property {number} goldAmount
     */
    goldAmount: {
      type: Number,
    },
  
    /**
     * An array of equipment IDs associated with the user.
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
 * The User model.
 *
 * @typedef {Model<User>} UserModel
 */
const User = mongoose.model('User', userSchema);

User.prototype.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}


module.exports = User;
