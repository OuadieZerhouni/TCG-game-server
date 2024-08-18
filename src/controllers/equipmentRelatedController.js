/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const EquipmentService = require('../services/equipmentService');

/**
 * Controller for related operations on equipment.
 */
class EquipmentRelatedController {
  /**
   * Get user cards equipped with a specific equipment.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getEquippedUserCards(req, res) {
    try {
      const equipmentId = req.params.equipmentId;
      const equippedUserCards = await EquipmentService.getEquippedUserCards(equipmentId);
      if (!equippedUserCards) {
        res.status(404).send('Equipment not found');
      } else {
        res.status(200).json(equippedUserCards);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Implement more related operations for the Equipment model here
}

module.exports = EquipmentRelatedController;
