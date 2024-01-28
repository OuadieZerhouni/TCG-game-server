/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */

const Equipment = require('../models/equipment'); // Adjust the path as needed

/**
 * Service class for managing equipment in the game.
 */
class EquipmentService {
  /**
   * Create a new equipment.
   *
   * @param {object} equipmentData - The data for the new equipment.
   * @returns {Promise<Equipment>} - The created equipment.
   */
  static async createEquipment(equipmentData) {
    try {
      const newEquipment = new Equipment(equipmentData);
      const createdEquipment = await newEquipment.save();
      return createdEquipment;
    } catch (error) {
      throw new Error('Unable to create equipment');
    }
  }

  /**
   * Find an equipment by its ID.
   *
   * @param {string} equipmentId - The ID of the equipment to find.
   * @returns {Promise<Equipment|null>} - The found equipment or null if not found.
   */
  static async findEquipmentById(equipmentId) {
    try {
      const equipment = await Equipment.findById(equipmentId).exec();
      return equipment;
    } catch (error) {
      throw new Error('Unable to find equipment by ID');
    }
  }

  /**
   * Update an existing equipment.
   *
   * @param {string} equipmentId - The ID of the equipment to update.
   * @param {object} updatedData - The updated data for the equipment.
   * @returns {Promise<Equipment|null>} - The updated equipment or null if not found.
   */
  static async updateEquipment(equipmentId, updatedData) {
    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        equipmentId,
        updatedData,
        { new: true }
      ).exec();
      return updatedEquipment;
    } catch (error) {
      throw new Error('Unable to update equipment');
    }
  }

  /**
   * Delete an equipment by its ID.
   *
   * @param {string} equipmentId - The ID of the equipment to delete.
   * @returns {Promise<boolean>} - A boolean indicating whether the equipment was deleted successfully.
   */
  static async deleteEquipment(equipmentId) {
    try {
      const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId).exec();
      return deletedEquipment !== null;
    } catch (error) {
      throw Error('Unable to delete equipment');
    }
  }
}

module.exports = EquipmentService;
