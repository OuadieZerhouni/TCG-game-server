/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const UserService = require('../services/userService');

/**
 * Controller for related operations on users.
 */
class UserRelatedController {
  /**
   * Get the profile of a user.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserProfile(req, res) {
    try {
      const userId = req.params.userId;
      const userProfile = await UserService.getUserProfile(userId);
      if (!userProfile) {
        res.status(404).send('User or profile not found');
      } else {
        res.status(200).json(userProfile);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get the friends of a user.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserFriends(req, res) {
    try {
      const userId = req.params.userId;
      const userFriends = await UserService.getUserFriends(userId);
      if (!userFriends) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(userFriends);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the User model here
}

module.exports = UserRelatedController;
