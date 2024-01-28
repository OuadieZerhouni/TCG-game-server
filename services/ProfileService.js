/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */

const Profile = require('../models/profile'); // Adjust the path as needed
const DeckService = require('./deckService'); // Adjust the path as needed

/**
 * Service class for managing user profiles in the game.
 */
class ProfileService {
  /**
   * Create a new user profile.
   *
   * @param {object} profileData - The data for the new profile.
   * @returns {Promise<Profile>} - The created profile.
   */
  static async createProfile(profileData) {
    try {
      profileData.Deck = await DeckService.createDeck({
        cards: [],
        totalPower: 0,
      });
      const newProfile = new Profile(profileData);
      const createdProfile = await newProfile.save();
      return createdProfile;
    } catch (error) {
      throw new Error('Unable to create profile: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Find a profile by its ID.
   *
   * @param {string} profileId - The ID of the profile to find.
   * @returns {Promise<Profile|null>} - The found profile or null if not found.
   */
  static async findProfileById(profileId) {
    try {
      const profile = await Profile.findById(profileId).exec();
      return profile;
    } catch (error) {
      throw new Error('Unable to find profile by ID: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Find a profile by its associated user ID.
   *
   * @param {string} userId - The ID of the user whose profile to find.
   * @returns {Promise<Profile|null>} - The found profile or null if not found.
   */
  static async findProfileByUserId(userId) {
    try {
      const profile = await Profile.findOne({ userId: userId }).exec();
      return profile;
    } catch (error) {
      throw new Error('Unable to find profile by User ID: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Update a profile by its ID.
   *
   * @param {string} profileId - The ID of the profile to update.
   * @param {object} profileData - The new data for the profile.
   * @returns {Promise<Profile|null>} - The updated profile or null if not found.
   */
  static async updateProfileById(profileId, profileData) {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(profileId, profileData, { new: true }).exec();
      return updatedProfile;
    } catch (error) {
      throw new Error('Unable to update profile by ID: ' + error.message); // Include the actual error message
    }
  }

  /**
   * Delete a profile by its ID.
   *
   * @param {string} profileId - The ID of the profile to delete.
   * @returns {Promise<Profile|null>} - The deleted profile or null if not found.
   */
  static async deleteProfileById(profileId) {
    try {
      const deletedProfile = await Profile.findByIdAndRemove(profileId).exec();
      return deletedProfile;
    } catch (error) {
      throw new Error('Unable to delete profile by ID: ' + error.message); // Include the actual error message
    }
  }
}

module.exports = ProfileService;
