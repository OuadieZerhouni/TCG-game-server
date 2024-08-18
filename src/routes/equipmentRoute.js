/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const express = require('express');
const router = express.Router();
const EquipmentController = require('../controllers/equipmentController.js');

/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: API for managing equipment.
 */

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get a list of all equipment.
 *     tags: [Equipment]
 *     responses:
 *       200:
 *         description: A list of equipment objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/equipment', EquipmentController.getAllEquipment);

/**
 * @swagger
 * /api/equipment/{equipmentId}:
 *   get:
 *     summary: Get equipment by ID.
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the equipment to retrieve.
 *     responses:
 *       200:
 *         description: The equipment object.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/equipment/:equipmentId', EquipmentController.getEquipmentById);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Create a new equipment.
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: The created equipment.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/equipment', EquipmentController.createEquipment);

/**
 * @swagger
 * /api/equipment/{equipmentId}:
 *   put:
 *     summary: Update equipment by ID.
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the equipment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: The updated equipment.
 *       404:
 *         description: Equipment not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/api/equipment/:equipmentId', EquipmentController.updateEquipment);

/**
 * @swagger
 * /api/equipment/{equipmentId}:
 *   delete:
 *     summary: Delete equipment by ID.
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: equipmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the equipment to delete.
 *     responses:
 *       204:
 *         description: Equipment deleted successfully.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/api/equipment/:equipmentId', EquipmentController.deleteEquipment);

module.exports = router;
