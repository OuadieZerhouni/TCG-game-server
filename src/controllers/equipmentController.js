/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const EquipmentService = require('../services/equipmentService');

/**
 * Controller for managing equipment operations.
 */
class EquipmentController {
  /**
   * Get a list of all equipment.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllEquipment(req, res) {
    try {
      const equipment = await EquipmentService.getAllEquipment();
      res.status(200).json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get equipment by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getEquipmentById(req, res) {
    try {
      const equipmentId = req.params.equipmentId;
      const equipment = await EquipmentService.findEquipmentById(equipmentId);
      if (!equipment) {
        res.status(404).send('Equipment not found');
      } else {
        res.status(200).json(equipment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new equipment.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createEquipment(req, res) {
    try {
      const equipmentData = req.body;
      const createdEquipment = await EquipmentService.createEquipment(equipmentData);
      res.status(201).json(createdEquipment);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update equipment by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateEquipment(req, res) {
    try {
      const equipmentId = req.params.equipmentId;
      const updatedData = req.body;
      const updatedEquipment = await EquipmentService.updateEquipment(equipmentId, updatedData);
      if (!updatedEquipment) {
        res.status(404).send('Equipment not found');
      } else {
        res.status(200).json(updatedEquipment);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete equipment by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteEquipment(req, res) {
    try {
      const equipmentId = req.params.equipmentId;
      const deleted = await EquipmentService.deleteEquipment(equipmentId);
      if (!deleted) {
        res.status(404).send('Equipment not found');
      } else {
        res.status(204).send('Equipment deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = EquipmentController;
