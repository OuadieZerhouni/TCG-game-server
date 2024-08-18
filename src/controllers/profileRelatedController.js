/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const ProfileService = require('../services/profileService');

/**
 * Controller for related operations on profiles.
 */
class ProfileRelatedController {
  /**
   * Get the decks associated with a user's profile.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserDecks(req, res) {
    try {
      const userId = req.params.userId;
      const userDecks = await ProfileService.getUserDecks(userId);
      if (!userDecks) {
        res.status(404).send('User or profile not found');
      } else {
        res.status(200).json(userDecks);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get the equipment associated with a user's profile.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserEquipments(req, res) {
    try {
      const userId = req.params.userId;
      const userEquipments = await ProfileService.getUserEquipments(userId);
      if (!userEquipments) {
        res.status(404).send('User or profile not found');
      } else {
        res.status(200).json(userEquipments);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the Profile model here
}

module.exports = ProfileRelatedController;
