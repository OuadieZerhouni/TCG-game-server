const User = require('../models/User'); // Adjust the path as needed

/**
 * Service class for managing users in the game.
 */
class UserService {
  /**
   * Create a new user.
   *
   * @param {object} userData - The data for the new user.
   * @returns {Promise<User>} - The created user.
   */
  static async createUser(userData) {
    try {
      const newUser = new User(userData);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  /**
   * Find a user by their ID.
   *
   * @param {string} userId - The ID of the user to find.
   * @returns {Promise<User|null>} - The found user or null if not found.
   */
  static async findUserById(userId) {
    try {
      const user = await User.findById(userId).exec();
      return user;
    } catch (error) {
      throw new Error('Unable to find user by ID');
    }
  }

  // Add methods for updating, querying, and deleting users here.
}

module.exports = UserService;
