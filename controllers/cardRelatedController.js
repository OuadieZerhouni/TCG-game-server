/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const CardService = require('../services/cardService');

/**
 * Controller for related operations on cards.
 */
class CardRelatedController {
  /**
   * Get the abilities associated with a card.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getCardAbilities(req, res) {
    try {
      const cardId = req.params.cardId;
      const cardAbilities = await CardService.getCardAbilities(cardId);
      if (!cardAbilities) {
        res.status(404).send('Card not found');
      } else {
        res.status(200).json(cardAbilities);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the Card model here
}

module.exports = CardRelatedController;
