/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const express = require('express');
const router = express.Router();
const UserCardController = require('../controllers/userCardController.js');

/**
 * @swagger
 * tags:
 *   name: UserCards
 *   description: API for managing user cards.
 */

/**
 * @swagger
 * /api/user-cards:
 *   get:
 *     summary: Get a list of all user cards.
 *     tags: [UserCards]
 *     responses:
 *       200:
 *         description: A list of user card objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', UserCardController.getAllUserCards);

/**
 * @swagger
 * /api/user-cards/{userCardId}:
 *   get:
 *     summary: Get a user card by ID.
 *     tags: [UserCards]
 *     parameters:
 *       - in: path
 *         name: userCardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user card to retrieve.
 *     responses:
 *       200:
 *         description: The user card object.
 *       404:
 *         description: User card not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:userCardId', UserCardController.getUserCardById);

/**
 * @swagger
 * /api/user-cards/randomOne:
 *  post:
 *   summary: Get a random user card.
 *  tags: [UserCards]
 * responses:
 * 200:
 * description: A user card object.
 * 500:
 * description: Internal server error.
 */
router.post('/randomOne', UserCardController.getOneRandomUserCard);

/**
 * @swagger
 * /api/user-cards:
 *   post:
 *     summary: Create a new user card.
 *     tags: [UserCards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCard'
 *     responses:
 *       201:
 *         description: The created user card.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', UserCardController.createUserCard);

/**
 * @swagger
 * /api/user-cards/{userCardId}:
 *   put:
 *     summary: Update a user card by ID.
 *     tags: [UserCards]
 *     parameters:
 *       - in: path
 *         name: userCardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user card to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCard'
 *     responses:
 *       200:
 *         description: The updated user card.
 *       404:
 *         description: User card not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:userCardId', UserCardController.updateUserCard);

/**
 * @swagger
 * /api/user-cards/{userCardId}:
 *   delete:
 *     summary: Delete a user card by ID.
 *     tags: [UserCards]
 *     parameters:
 *       - in: path
 *         name: userCardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user card to delete.
 *     responses:
 *       204:
 *         description: User card deleted successfully.
 *       404:
 *         description: User card not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:userCardId', UserCardController.deleteUserCard);
module.exports = router;
