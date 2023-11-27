const express = require('express');
const router = express.Router();
const DeckController = require('../controllers/deckController.js');

/**
 * @swagger
 * tags:
 *   name: Decks
 *   description: API for managing decks.
 */

/**
 * @swagger
 * /api/decks:
 *   get:
 *     summary: Get a list of all decks.
 *     tags: [Decks]
 *     responses:
 *       200:
 *         description: A list of deck objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/decks', DeckController.getAllDecks);

/**
 * @swagger
 * /api/decks/{deckId}:
 *   get:
 *     summary: Get a deck by ID.
 *     tags: [Decks]
 *     parameters:
 *       - in: path
 *         name: deckId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the deck to retrieve.
 *     responses:
 *       200:
 *         description: The deck object.
 *       404:
 *         description: Deck not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/decks/:deckId', DeckController.getDeckById);

/**
 * @swagger
 * /api/decks:
 *   post:
 *     summary: Create a new deck.
 *     tags: [Decks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deck'
 *     responses:
 *       201:
 *         description: The created deck.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/decks', DeckController.createDeck);

/**
 * @swagger
 * /api/decks/{deckId}:
 *   put:
 *     summary: Update a deck by ID.
 *     tags: [Decks]
 *     parameters:
 *       - in: path
 *         name: deckId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the deck to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deck'
 *     responses:
 *       200:
 *         description: The updated deck.
 *       404:
 *         description: Deck not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/api/decks/:deckId', DeckController.updateDeck);

/**
 * @swagger
 * /api/decks/{deckId}:
 *   delete:
 *     summary: Delete a deck by ID.
 *     tags: [Decks]
 *     parameters:
 *       - in: path
 *         name: deckId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the deck to delete.
 *     responses:
 *       204:
 *         description: Deck deleted successfully.
 *       404:
 *         description: Deck not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/api/decks/:deckId', DeckController.deleteDeck);

module.exports = router;
