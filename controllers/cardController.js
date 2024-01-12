const CardService = require('../services/cardService');

/**
 * Controller for managing card operations.
 */
class CardController {
  /**
   * Get a list of all cards.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllCards(req, res) {
    try {
      const cards = await CardService.getAllCards();
      res.status(200).json(cards);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getCardById(req, res) {
    try {
      const cardId = req.params.cardId;
      const card = await CardService.findCardById(cardId);
      if (!card) {
        res.status(404).send('Card not found');
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new card.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createCard(req, res) {
    try {
      const cardData = req.body;
      const createdCard = await CardService.createCard(cardData);
      res.status(201).json(createdCard);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateCard(req, res) {
    try {
      const cardId = req.params.cardId;
      const updatedData = req.body;
      const updatedCard = await CardService.updateCard(cardId, updatedData);
      if (!updatedCard) {
        res.status(404).send('Card not found');
      } else {
        res.status(200).json(updatedCard);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteCard(req, res) {
    try {
      const cardId = req.params.cardId;
      const deleted = await CardService.deleteCard(cardId);
      if (!deleted) {
        res.status(404).send('Card not found');
      } else {
        res.status(204).send('Card deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = CardController;
