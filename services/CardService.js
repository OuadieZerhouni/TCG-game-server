/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */



const Card = require('../models/Card');

/**
 * Service class for managing cards in the game.
 */
class CardService {
  /**
   * Create a new card.
   *
   * @param {object} cardData - The data for the new card.
   * @returns {Promise<Card>} - The created card.
   */
  static async createCard(cardData) {
    try {
      const newCard = new Card(cardData);
      const createdCard = await newCard.save();
      return createdCard;
    } catch (error) {
      throw new Error('Unable to create card');
    }
  }



  /**
   * getOneRandomUserCard
   * 
   * @returns {Promise<Card>} - A random user card.
   */
  static async getOneRandomCard() {
    try {
      const userCard = await Card.aggregate([{ $sample: { size: 1 } }]);
      return userCard[0];
    } catch (error) {
      throw new Error('Unable to get a random user card: ' + error);
    }
  }

  /**
   * Find a card by its ID.
   *
   * @param {string} cardId - The ID of the card to find.
   * @returns {Promise<Card|null>} - The found card or null if not found.
   */
  static async findCardById(cardId) {
    try {
      const card = await Card.findById(cardId).exec();
      return card;
    } catch (error) {
      throw new Error('Unable to find card by ID');
    }
  }

  /**
   * getAllCardsNames
   * @returns {Promise<Card[]>} - The list of cards names.
   */
  static async getAllCardsNames() {
    try {
      const cards = await Card.find().select('name').exec();
      return cards;
    } catch (error) {
      throw new Error('Unable to get all cards names');
    }
  }

  /**
   * Update an existing card.
   *
   * @param {string} cardId - The ID of the card to update.
   * @param {object} updatedData - The updated data for the card.
   * @returns {Promise<Card|null>} - The updated card or null if not found.
   */
  static async updateCard(cardId, updatedData) {
    try {
      const updatedCard = await Card.findByIdAndUpdate(cardId, updatedData, {
        new: true,
      }).exec();
      return updatedCard;
    } catch (error) {
      throw new Error('Unable to update card');
    }
  }

  /**
   * Delete a card by its ID.
   *
   * @param {string} cardId - The ID of the card to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the card was deleted successfully.
   */
  static async deleteCard(cardId) {
    try {
      const deletedCard = await Card.findByIdAndDelete(cardId).exec();
      return deletedCard;
    } catch (error) {
      throw new Error('Unable to delete card');
    }
  }

  /**
   * Get all cards.
   *
   * @returns {Promise<Card[]>} - The list of cards.
   */
  static async getAllCards() {
    try {
      const cards = await Card.find().exec();
      return cards;
    } catch (error) {
      throw new Error('Unable to get all cards');
    }
  }
}

module.exports = CardService;
