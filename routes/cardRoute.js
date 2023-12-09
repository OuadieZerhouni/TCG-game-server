const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController.js');

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: API for managing cards.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of all cards.
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: A list of card objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', CardController.getAllCards);

/**
 * @swagger
 * /{cardId}:
 *   get:
 *     summary: Get a card by ID.
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the card to retrieve.
 *     responses:
 *       200:
 *         description: The card object.
 *       404:
 *         description: Card not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:cardId', CardController.getCardById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new card.
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: The created card.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', CardController.createCard);

/**
 * @swagger
 * /{cardId}:
 *   put:
 *     summary: Update a card by ID.
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the card to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: The updated card.
 *       404:
 *         description: Card not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:cardId', CardController.updateCard);

/**
 * @swagger
 * /{cardId}:
 *   delete:
 *     summary: Delete a card by ID.
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the card to delete.
 *     responses:
 *       204:
 *         description: Card deleted successfully.
 *       404:
 *         description: Card not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:cardId', CardController.deleteCard);

module.exports = router;
