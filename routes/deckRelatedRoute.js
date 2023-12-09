const express = require('express');
const router = express.Router();
const DeckRelatedController = require('../controllers/deckRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: DeckRelated
 *   description: API for related operations on decks.
 */

/**
 * @swagger
 * /{deckId}/cards:
 *   get:
 *     summary: Get the cards in a specific deck.
 *     tags: [DeckRelated]
 *     parameters:
 *       - in: path
 *         name: deckId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the deck whose cards to retrieve.
 *     responses:
 *       200:
 *         description: A list of cards in the deck.
 *       404:
 *         description: Deck not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:deckId/cards', DeckRelatedController.getDeckCards);

// Add more related operations for the Deck model here

module.exports = router;
