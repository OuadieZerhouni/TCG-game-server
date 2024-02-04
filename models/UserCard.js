/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const mongoose = require('mongoose');
const { populate } = require('./level');

/**
 * Represents a card owned by a user in the game.
 *
 * @class UserCard
 */
const userCardSchema = new mongoose.Schema({
  /**
   * The ID of the card associated with this user card.
   *
   * @property {Card} cardId
   * @required
   */
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true,
  },

  /**
   * The attack power of the card.
   *
   * @property {number} attack
   * @required
   */
  attack: {
    type: Number,
    required: true,
  },

  /**
   * The defense power of the card.
   *
   * @property {number} defence
   * @required
   */
  blood: {
    type: Number,
    required: true,
  },

  /**
   * The experience points (XP) associated with the card.
   *
   * @property {number} xp
   * @required
   */
  xp: {
    type: Number,
    required: true,
    default: 0,
  },

  /**
   * The level of the card.
   *
   * @property {number} level
   * @required
   */
  level: {
    type: Number,
    required: true,
    default: 1,
  },

  /**
   * An array of ability IDs that are unlocked for this user card.
   *
   * @property {string[]} unlockedAbilities
   */
  unlockedAbilities: {
    type: [String],
  },
});

/**
 * The UserCard model.
 *
 * @typedef {Model<UserCard>} UserCardModel
 */
const UserCard = mongoose.model('UserCard', userCardSchema);

module.exports = UserCard;
