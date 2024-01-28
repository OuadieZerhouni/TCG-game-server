/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const express = require('express');
const router = express.Router();
const UserCardRelatedController = require('../controllers/userCardRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: UserCardRelated
 *   description: API for related operations on user cards.
 */

/**
 * @swagger
 * /{userCardId}/abilities:
 *   get:
 *     summary: Get the abilities associated with a user card.
 *     tags: [UserCardRelated]
 *     parameters:
 *       - in: path
 *         name: userCardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user card whose abilities to retrieve.
 *     responses:
 *       200:
 *         description: A list of user card's abilities.
 *       404:
 *         description: User card not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:userCardId/abilities', UserCardRelatedController.getUserCardAbilities);

// Add more related operations for the UserCard model here

module.exports = router;
