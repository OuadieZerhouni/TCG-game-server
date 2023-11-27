const Ability = require('../models/Ability');

/**
 * Service class for managing abilities in the game.
 */
class AbilityService {
  /**
   * Create a new ability.
   *
   * @param {object} abilityData - The data for the new ability.
   * @returns {Promise<Ability>} - The created ability.
   */
  static async createAbility(abilityData) {
    try {
      const newAbility = new Ability(abilityData);
      const createdAbility = await newAbility.save();
      return createdAbility;
    } catch (error) {
      throw new Error('Unable to create ability');
    }
  }

  /**
   * Find an ability by its ID.
   *
   * @param {string} abilityId - The ID of the ability to find.
   * @returns {Promise<Ability|null>} - The found ability or null if not found.
   */
  static async findAbilityById(abilityId) {
    try {
      const ability = await Ability.findById(abilityId).exec();
      return ability;
    } catch (error) {
      throw new Error('Unable to find ability by ID');
    }
  }

  /**
   * Update an existing ability.
   *
   * @param {string} abilityId - The ID of the ability to update.
   * @param {object} updatedData - The updated data for the ability.
   * @returns {Promise<Ability|null>} - The updated ability or null if not found.
   */
  static async updateAbility(abilityId, updatedData) {
    try {
      const updatedAbility = await Ability.findByIdAndUpdate(
        abilityId,
        updatedData,
        { new: true }
      ).exec();
      return updatedAbility;
    } catch (error) {
      throw new Error('Unable to update ability');
    }
  }

  /**
   * Delete an ability by its ID.
   *
   * @param {string} abilityId - The ID of the ability to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the ability was deleted successfully.
   */
  static async deleteAbility(abilityId) {
    try {
      const deletedAbility = await Ability.findByIdAndDelete(abilityId).exec();
      return deletedAbility !== null;
    } catch (error) {
      throw new Error('Unable to delete ability');
    }
  }
}

module.exports = AbilityService;
