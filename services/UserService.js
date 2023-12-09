const User = require('../models/User'); // Adjust the path as needed
const bcrypt = require('bcrypt');

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
      userData.password = await UserService.hashPassword(userData.password);
      const newUser = new User(userData);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw   new Error('Unable to create user :'+error);
    }
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
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

  static async loginUser(userData) {
    try {
      const user = await User.findOne({ username: userData.username }).exec();
      if (!user) {
        return null;
      }
      const isMatch = await user.comparePassword(userData.password);
      if (!isMatch) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error('Unable to login user :'+error);
    }
  }

  /**
   * Get a list of all users.
   *
   * @returns {Promise<User[]>} - A list of all users.
   */
  static async getAllUsers() {
    try {
      const users = await User.find().exec();
      return users;
    } catch (error) {
      throw new Error('Unable to get all users');
    }

  }


}

module.exports = UserService;
