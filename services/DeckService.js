/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */



const Deck = require('../models/deck'); // Adjust the path as needed
const UserCard = require('../models/userCard');

/**
 * Service class for managing decks in the game.
 */
class DeckService {



  /**
   * addUserCardToDeck
   * 
   * @param {Deck} deck - The ID of the deck to add the user card to.
   * @param {UserCard} userCard - The ID of the user card to add to the deck.
   */
  static async addUserCardToDeck(deck, userCard) {
    try {
      deck.cards.push(userCard._id);
      let cardPower = userCard.attack + userCard.blood;
      deck.totalPower += cardPower;
      await deck.save();
      return deck;
    } catch (error) {
      throw new Error('Unable to add user card to deck: ' + error.message); // Include the actual error message
    }
  } 

  /**
   * Create a new deck.
   *
   * @param {object} deckData - The data for the new deck.
   * @returns {Promise<Deck>} - The created deck.
   */
  static async createDeck() {
    try {
      const deckData = {
        cards: [],
        totalPower: 0,
      };
      const newDeck = new Deck(deckData);
      const createdDeck = await newDeck.save();
      return createdDeck;
    } catch (error) {
      throw new Error('Unable to create deck: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Get a list of all decks.
   * @returns {Promise<Deck[]>} - The retrieved decks.
   */
  static async getAllDecks() {
    try {
      const decks = await Deck.find().populate('cards');
      return decks;
    } catch (error) {
      throw new Error('Unable to retrieve decks: ' + error.message); // Include the actual error message
    }
  }


  /**
   * Find a deck by its ID.
   *
   * @param {string} deckId - The ID of the deck to find.
   * @returns {Promise<Deck|null>} - The found deck or null if not found.
   */
  static async findDeckById(deckId) {
    try {
      const deck = await Deck.findById(deckId).exec();
      return deck;
    } catch (error) {
      throw new Error('Unable to find deck by ID: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Update an existing deck.
   *
   * @param {string} deckId - The ID of the deck to update.
   * @param {object} updatedData - The updated data for the deck.
   * @returns {Promise<Deck|null>} - The updated deck or null if not found.
   */
  static async updateDeck(deckId, updatedData) {
    try {
      const updatedDeck = await Deck.findByIdAndUpdate(deckId, updatedData, {
        new: true,
      }).exec();
      return updatedDeck;
    } catch (error) {
      throw new Error('Unable to update deck: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Delete a deck by its ID.
   *
   * @param {string} deckId - The ID of the deck to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the deck was deleted successfully.
   */
  static async deleteDeck(deckId) {
    try {
      const deletedDeck = await Deck.findByIdAndDelete(deckId).exec();
      return deletedDeck !== null;
    } catch (error) {
      throw new Error('Unable to delete deck: ' + error.message); // Include the actual error message
    }
  }
}

module.exports = DeckService;
