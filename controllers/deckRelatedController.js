/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const DeckService = require('../services/deckService');

/**
 * Controller for related operations on decks.
 */
class DeckRelatedController {
  /**
   * Get the cards in a specific deck.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getDeckCards(req, res) {
    try {
      const deckId = req.params.deckId;
      const deckCards = await DeckService.getDeckCards(deckId);
      if (!deckCards) {
        res.status(404).send('Deck not found');
      } else {
        res.status(200).json(deckCards);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the Deck model here
}

module.exports = DeckRelatedController;
