const UserService = require('../services/userService');

/**
 * Controller for managing user operations.
 */
class UserController {
  /**
   * Get a list of all users.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserById(req, res) {
    try {
      const userId = req.params.userId;
      const user = await UserService.findUserById(userId);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new user.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const createdUser = await UserService.createUser(userData);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;
      const updatedUser = await UserService.updateUser(userId, updatedData);
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).send('User not found');
      } else {
        res.status(204).send('User deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UserController;
