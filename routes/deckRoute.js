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
 * /:
 *   get:
 *     summary: Get a list of all decks.
 *     tags: [Decks]
 *     responses:
 *       200:
 *         description: A list of deck objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', DeckController.getAllDecks);

/**
 * @swagger
 * //{deckId}:
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
router.get('/:deckId', DeckController.getDeckById);

/**
 * @swagger
 * /:
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
router.post('/', DeckController.createDeck);

/**
 * @swagger
 * //{deckId}:
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
router.put('/:deckId', DeckController.updateDeck);

/**
 * @swagger
 * //{deckId}:
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
router.delete('/:deckId', DeckController.deleteDeck);

module.exports = router;
