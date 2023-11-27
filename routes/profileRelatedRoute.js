const express = require('express');
const router = express.Router();
const ProfileRelatedController = require('../controllers/profileRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: ProfileRelated
 *   description: API for related operations on profiles.
 */

/**
 * @swagger
 * /api/profiles/{userId}/decks:
 *   get:
 *     summary: Get the decks associated with a user's profile.
 *     tags: [ProfileRelated]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose decks to retrieve.
 *     responses:
 *       200:
 *         description: A list of user's decks.
 *       404:
 *         description: User or profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/profiles/:userId/decks', ProfileRelatedController.getUserDecks);

/**
 * @swagger
 * /api/profiles/{userId}/equipments:
 *   get:
 *     summary: Get the equipment associated with a user's profile.
 *     tags: [ProfileRelated]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose equipment to retrieve.
 *     responses:
 *       200:
 *         description: A list of user's equipment.
 *       404:
 *         description: User or profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/profiles/:userId/equipments', ProfileRelatedController.getUserEquipments);

// Add more related operations for the Profile model here

module.exports = router;
