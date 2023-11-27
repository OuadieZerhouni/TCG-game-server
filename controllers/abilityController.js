const AbilityService = require('../services/abilityService');

/**
 * Controller for managing ability operations.
 */
class AbilityController {
  /**
   * Get a list of all abilities.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllAbilities(req, res) {
    try {
      const abilities = await AbilityService.getAllAbilities();
      res.status(200).json(abilities);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get an ability by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAbilityById(req, res) {
    try {
      const abilityId = req.params.abilityId;
      const ability = await AbilityService.findAbilityById(abilityId);
      if (!ability) {
        res.status(404).send('Ability not found');
      } else {
        res.status(200).json(ability);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new ability.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createAbility(req, res) {
    try {
      const abilityData = req.body;
      const createdAbility = await AbilityService.createAbility(abilityData);
      res.status(201).json(createdAbility);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update an ability by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateAbility(req, res) {
    try {
      const abilityId = req.params.abilityId;
      const updatedData = req.body;
      const updatedAbility = await AbilityService.updateAbility(abilityId, updatedData);
      if (!updatedAbility) {
        res.status(404).send('Ability not found');
      } else {
        res.status(200).json(updatedAbility);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete an ability by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteAbility(req, res) {
    try {
      const abilityId = req.params.abilityId;
      const deleted = await AbilityService.deleteAbility(abilityId);
      if (!deleted) {
        res.status(404).send('Ability not found');
      } else {
        res.status(204).send('Ability deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = AbilityController;
