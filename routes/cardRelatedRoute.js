const express = require('express');
const router = express.Router();
const CardRelatedController = require('../controllers/cardRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: CardRelated
 *   description: API for related operations on cards.
 */

/**
 * @swagger
 * /api/cards/{cardId}/abilities:
 *   get:
 *     summary: Get the abilities associated with a card.
 *     tags: [CardRelated]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the card whose abilities to retrieve.
 *     responses:
 *       200:
 *         description: A list of card's abilities.
 *       404:
 *         description: Card not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/cards/:cardId/abilities', CardRelatedController.getCardAbilities);

// Add more related operations for the Card model here

module.exports = router;
