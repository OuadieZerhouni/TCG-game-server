const express = require('express');
const router = express.Router();
const EquipmentRelatedController = require('../controllers/equipmentRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: EquipmentRelated
 *   description: API for related operations on equipment.
 */

/**
 * @swagger
 * /{equipmentId}/user-cards:
 *   get:
 *     summary: Get user cards equipped with a specific equipment.
 *     tags: [EquipmentRelated]
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the equipment whose equipped user cards to retrieve.
 *     responses:
 *       200:
 *         description: A list of user cards equipped with the equipment.
 *       404:
 *         desc     ription: Equipment not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:equipmentId/user-cards', EquipmentRelatedController.getEquippedUserCards);


module.exports = router;
