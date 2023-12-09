const Deck = require('../models/Deck'); // Adjust the path as needed

/**
 * Service class for managing decks in the game.
 */
class DeckService {
  /**
   * Create a new deck.
   *
   * @param {object} deckData - The data for the new deck.
   * @returns {Promise<Deck>} - The created deck.
   */
  static async createDeck(deckData) {
    try {
      const newDeck = new Deck(deckData);
      const createdDeck = await newDeck.save();
      return createdDeck;
    } catch (error) {
      throw new Error('Unable to create deck: ' + error.message); // Include the actual error message
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
