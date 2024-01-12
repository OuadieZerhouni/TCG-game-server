const UserCard = require('../models/userCard'); // Adjust the path as needed

/**
 * Service class for managing user cards in the game.
 */
class UserCardService {
  /**
   * Create a new user card.
   *
   * @param {object} userCardData - The data for the new user card.
   * @returns {Promise<UserCard>} - The created user card.
   */
  static async createUserCard(userCardData) {
    try {
      const newUserCard = new UserCard(userCardData);
      const createdUserCard = await newUserCard.save();
      return createdUserCard;
    } catch (error) {
      throw new Error('Unable to create user card');
    }
  }

  /**
   * Find a user card by its ID.
   *
   * @param {string} userCardId - The ID of the user card to find.
   * @returns {Promise<UserCard|null>} - The found user card or null if not found.
   */
  static async findUserCardById(userCardId) {
    try {
      const userCard = await UserCard.findById(userCardId).exec();
      return userCard;
    } catch (error) {
      throw new Error('Unable to find user card by ID');
    }
  }

  /**
   * Update an existing user card.
   *
   * @param {string} userCardId - The ID of the user card to update.
   * @param {object} updatedData - The updated data for the user card.
   * @returns {Promise<UserCard|null>} - The updated user card or null if not found.
   */
  static async updateUserCard(userCardId, updatedData) {
    try {
      const updatedUserCard = await UserCard.findByIdAndUpdate(
        userCardId,
        updatedData,
        { new: true }
      ).exec();
      return updatedUserCard;
    } catch (error) {
      throw new Error('Unable to update user card');
    }
  }

  /**
   * Delete a user card by its ID.
   *
   * @param {string} userCardId - The ID of the user card to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the user card was deleted successfully.
   */
  static async deleteUserCard(userCardId) {
    try {
      const deletedUserCard = await UserCard.findByIdAndDelete(userCardId).exec();
      return deletedUserCard !== null;
    } catch (error) {
      throw new Error('Unable to delete user card');
    }
  }
}

module.exports = UserCardService;
