/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const mongoose = require('mongoose');

/**
 * Represents a deck in the game.
 *
 * @class Deck
 */
const deckSchema = new mongoose.Schema({

  /**
   * An array of user cards that belong to the deck.
   *
   * @property {UserCard[]} cards
   * @required
   */
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserCard',
      required: true,
    },
  ],

  /**
   * The total power of the deck.
   *
   * @property {number} totalPower
   */
  totalPower: {
    type: Number,
  },
});

/**
 * The Deck model.
 *
 * @typedef {Model<Deck>} DeckModel
 */
const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
