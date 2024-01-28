/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const UserCardService = require('../services/userCardService');

/**
 * Controller for related operations on user cards.
 */
class UserCardRelatedController {
  /**
   * Get the abilities associated with a user card.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserCardAbilities(req, res) {
    try {
      const userCardId = req.params.userCardId;
      const userCardAbilities = await UserCardService.getUserCardAbilities(userCardId);
      if (!userCardAbilities) {
        res.status(404).send('User card not found');
      } else {
        res.status(200).json(userCardAbilities);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the UserCard model here
}

module.exports = UserCardRelatedController;
