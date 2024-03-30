/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const AbilityService = require('../services/abilityService');
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


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
    // Access the fields sent in the request
    const { functionName, power } = req.body;
    // Create an ability object with power and functionName
    const ability = {
        power,
        functionName,
    };

    const createdAbility = await AbilityService.createAbility(ability);

    // Save the image data as a PNG file with the function name as the filename
    if (req.file) {
      // Remove the data URI prefix and decode the base64 string
      const base64Image = req.file.buffer.toString('utf8').replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Image, 'base64');
  
      const imagePath = path.join(__dirname, `../data/abilities/${functionName}.png`);
  
      // Write the decoded buffer to a file
      await writeFileAsync(imagePath, imageBuffer);
  
      // Include the image path in the response if needed
      createdAbility.image = imagePath;
  }

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
        // delete the image file
        const imagePath = path.join(__dirname, `../data/abilities/${deleted.functionName}.png`);
        fs.unlinkSync(imagePath);
        res.status(204).send('Ability deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = AbilityController;
