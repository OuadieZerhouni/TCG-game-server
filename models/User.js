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
