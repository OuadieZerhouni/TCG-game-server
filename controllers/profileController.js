const ProfileService = require('../services/profileService');

/**
 * Controller for managing user profile operations.
 */
class ProfileController {
  /**
   * Get a list of all user profiles.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllProfiles(req, res) {
    try {
      const profiles = await ProfileService.getAllProfiles();
      res.status(200).json(profiles);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a user profile by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getProfileById(req, res) {
    try {
      const profileId = req.params.profileId;
      const profile = await ProfileService.findProfileById(profileId);
      if (!profile) {
        res.status(404).send('Profile not found');
      } else {
        res.status(200).json(profile);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new user profile.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createProfile(req, res) {
    try {
      const profileData = req.body;
      const createdProfile = await ProfileService.createProfile(profileData);
      res.status(201).json(createdProfile);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a user profile by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateProfile(req, res) {
    try {
      const profileId = req.params.profileId;
      const updatedData = req.body;
      const updatedProfile = await ProfileService.updateProfile(profileId, updatedData);
      if (!updatedProfile) {
        res.status(404).send('Profile not found');
      } else {
        res.status(200).json(updatedProfile);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a user profile by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteProfile(req, res) {
    try {
      const profileId = req.params.profileId;
      const deleted = await ProfileService.deleteProfile(profileId);
      if (!deleted) {
        res.status(404).send('Profile not found');
      } else {
        res.status(204).send('Profile deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = ProfileController;
