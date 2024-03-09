/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const mongoose = require('mongoose');

/**
 * Represents a card in the game.
 *
 * @class Card
 */
const cardSchema = new mongoose.Schema({
  /**
   * The name of the card.
   *
   * @property {string} name
   * @required
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * The type of the card (e.g., "Creature," "Spell").
   *
   * @property {string} type
   * @required
   */
  type: {
    type: String,
    required: true,
  },

  /**
   * The base attack power of the card.
   *
   * @property {number} baseAttack
   * @required
   */
  baseAttack: {
    type: Number,
    required: true,
  },

  /**
   * The base blood value of the card.
   *
   * @property {number} baseBlood
   * @required
   */
  baseBlood: {
    type: Number,
    required: true,
  },

  /**
   * An array of ability IDs associated with the card.
   * type array of _id from Ability model
   *
   * @property {array} abilities
   * @required
   */
  abilities: {
    type: [String],
    ref: 'Ability',
    required: true,
  },
  /**
   * The price of the card in the in-game currency.
   *
   * @property {number} price
   * @required
   */
  price: {
    type: Number,
    required: true,
  },

  /**
   * A description of the card.
   *
   * @property {string} description
   * @required
   */
  description: {
    type: String,
    required: true,
  },
});

/**
 * The Card model.
 *
 * @typedef {Model<Card>} CardModel
 */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
