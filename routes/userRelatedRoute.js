const express = require('express');
const router = express.Router();
const UserRelatedController = require('../controllers/userRelatedController.js');

/**
 * @swagger
 * tags:
 *   name: UserRelated
 *   description: API for related operations on users.
 */

/**
 * @swagger
 * /api/users/{userId}/profile:
 *   get:
 *     summary: Get the profile of a user.
 *     tags: [UserRelated]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose profile to retrieve.
 *     responses:
 *       200:
 *         description: The user's profile.
 *       404:
 *         description: User or profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/users/:userId/profile', UserRelatedController.getUserProfile);

/**
 * @swagger
 * /api/users/{userId}/friends:
 *   get:
 *     summary: Get the friends of a user.
 *     tags: [UserRelated]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose friends to retrieve.
 *     responses:
 *       200:
 *         description: A list of user's friends.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/users/:userId/friends', UserRelatedController.getUserFriends);

// Add more related operations for the User model here

module.exports = router;
s