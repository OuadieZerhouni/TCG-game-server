/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */



const Deck = require('../model/Deck');
const UserCard = require('../model/UserCard');

/**
 * Service class for managing decks in the game.
 */
class DeckService {

  // deckService.updateDeckCards(user.deck._id, cardsToAdd, cardsToRemove)
  static async updateDeckCards(deckId, cardsToAdd, cardsToRemove) {
    try {
      console.log(cardsToAdd);
      console.log(cardsToRemove);
      const deck = await Deck.findById(deckId).exec();
      for (const card of cardsToAdd) {
        const userCard = await UserCard
          .findById(card)
          .exec();
        deck.totalPower += userCard.attack + userCard.blood;
        deck.cards.push(userCard._id);
      }
      for (const card of cardsToRemove) {
        const userCard = await UserCard
          .findById(card)
          .exec();
        deck.totalPower -= userCard.attack + userCard.blood;
        deck.cards = deck.cards.filter(cardId => cardId.toString() !== card);
      }
      await deck.save();
    }
    catch (error) {
      throw new Error('Unable to update deck cards: ' + error.message); // Include the actual error message
    }
  }


  
  /**
   * Adds a card to a deck.
   * @param {string} deckId - The ID of the deck.
   * @param {string} userCardId - The card to be added to the deck.
   * @throws {Error} If unable to add card to deck.
   */
  static async addCardToDeck(deckId, userCardId) {
    try {
      const deck = await Deck.findById(deckId).exec();
      const userCard = await UserCard.findById(userCardId).exec();
      deck.totalPower += userCard.attack + userCard.blood;
      console.log( userCard.attack);
      deck.cards.push(userCard._id);
      await deck.save();
    } catch (error) {
      throw new Error('Unable to add card to deck: ' + error.message); // Include the actual error message
    }
  }

  /**
   * remove a card from a deck.
   * 
   * @param {string} deckId - The ID of the deck.
   * @param {string} userCardId - The card to be removed from the deck.
   * @throws {Error} If unable to remove card from deck.
   */
  static async removeCardFromDeck(deckId, userCardId) {
    try {
      const deck = await Deck.findById(deckId).exec();
      const userCard = await UserCard.findById(userCardId).exec();
      deck.totalPower -= userCard.attack + userCard.blood;
      deck.cards = deck.cards.filter(card => card.toString() !== userCardId);
      await deck.save();
    } catch (error) {
      throw new Error('Unable to remove card from deck: ' + error.message); // Include the actual error message
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
