const DeckService = require('../services/deckService');

/**
 * Controller for managing deck operations.
 */
class DeckController {
  /**
   * Get a list of all decks.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllDecks(req, res) {
    try {
      const decks = await DeckService.getAllDecks();
      res.status(200).json(decks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a deck by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getDeckById(req, res) {
    try {
      const deckId = req.params.deckId;
      const deck = await DeckService.findDeckById(deckId);
      if (!deck) {
        res.status(404).send('Deck not found');
      } else {
        res.status(200).json(deck);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new deck.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createDeck(req, res) {
    try {
      const deckData = req.body;
      const createdDeck = await DeckService.createDeck(deckData);
      res.status(201).json(createdDeck);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a deck by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateDeck(req, res) {
    try {
      const deckId = req.params.deckId;
      const updatedData = req.body;
      const updatedDeck = await DeckService.updateDeck(deckId, updatedData);
      if (!updatedDeck) {
        res.status(404).send('Deck not found');
      } else {
        res.status(200).json(updatedDeck);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a deck by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteDeck(req, res) {
    try {
      const deckId = req.params.deckId;
      const deleted = await DeckService.deleteDeck(deckId);
      if (!deleted) {
        res.status(404).send('Deck not found');
      } else {
        res.status(204).send('Deck deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = DeckController;
