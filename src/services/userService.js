/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */
require("util");
const User = require("../models/User"); // Adjust the path as needed
const bcrypt = require("bcrypt");

/**
 * Service class for managing users in the game.
 */
class UserService {
  /**
   * addUserCard
   *
   * @param {User} user - The ID of the deck to add the user card to.
   * @param {UserCard} userCard - The ID of the user card to add to the deck.
   * @returns {Promise<User>} - The updated user.
   */
  static async addUserCard(user, userCard) {
    try {
      user.userCards.push(userCard._id);
      await user.save();
      return user;
    } catch (error) {
      throw new Error("Unable to add user card to deck: " + error.message); // Include the actual error message
    }
  }

  
/**
 * Find a user by Google Play ID.
 *
 * @param {string} googlePlayId - The Google Play ID to search for.
 * @returns {Promise<Object|null>} The found user or null.
 */
static async findUserByGooglePlayId(googlePlayId) {
  try {
    return await User.findOne({ googlePlayId });
  } catch (error) {
    console.error('Error finding user by Google Play ID:', error);
    throw error;
  }
}

  /**
   * Create a new user.
   *
   * @param {object} userData - The data for the new user.
   * @returns {Promise<User>} - The created user.
   */
  static async createUser(userData) {
    try {
      if (userData.password) userData.password = await UserService.hashPassword(userData.password);
      const newUser = new User(userData);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw new Error("Unable to create user :" + error);
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
   * @param {boolean} populate - Whether to populate the user's deck with cards.
   * @returns {Promise<User|null>} - The found user or null if not found.
   */
  static async findUserById(userId, populate = false) {
    try {
      let query = User.findById(userId);
      if (populate) {
        query = query.populate({
          path: "deck",
          populate: {
            path: "cards",
            populate: {
              path: "cardId",
              model: "Card", // Specify the model name for 'Card'
            },
          },
        }).populate({path: "userCards", populate: {path: "cardId", model: "Card"}});
      }

      const user = await query.exec();
      return user;
    } catch (error) {
      throw new Error("Unable to find user by ID: " + error);
    }
  }

  /**
   * Finds a user by their email.
   *
   * @param {string} email - The email of the user to find.
   * @returns {Promise<User>} The user object if found, otherwise throws an error.
   * @throws {Error} When unable to find the user.
   */
  static async findUserByEmail(email) {
    try {
      email = email.toLowerCase();
      const user = await User.findOne({ email: email }).exec();
      return user;
    } catch (error) {
      throw new Error("Unable to find user by email" + error);
    }
  }

  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username of the user to find.
   * @returns {Promise<User>} The user object if found, otherwise throws an error.
   * @throws {Error} When unable to find the user.
   */
  static async findUserByUsername(username) {
    try {
      const user = await User.findOne({
        username: { $regex: new RegExp("^" + username + "$", "i") },
      }).exec();
      return user;
    } catch (error) {
      throw new Error("Unable to find user by username" + error);
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
      throw new Error("Unable to login user :" + error);
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
      throw new Error("Unable to get all users");
    }
  }
}

module.exports = UserService;
