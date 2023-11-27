const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: API for managing user profiles.
 */

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get a list of all user profiles.
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: A list of profile objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/profiles', ProfileController.getAllProfiles);

/**
 * @swagger
 * /api/profiles/{profileId}:
 *   get:
 *     summary: Get a user profile by ID.
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the profile to retrieve.
 *     responses:
 *       200:
 *         description: The user profile object.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/profiles/:profileId', ProfileController.getProfileById);

/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a new user profile.
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: The created user profile.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/profiles', ProfileController.createProfile);

/**
 * @swagger
 * /api/profiles/{profileId}:
 *   put:
 *     summary: Update a user profile by ID.
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the profile to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: The updated user profile.
 *       404:
 *         description: Profile not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/api/profiles/:profileId', ProfileController.updateProfile);

/**
 * @swagger
 * /api/profiles/{profileId}:
 *   delete:
 *     summary: Delete a user profile by ID.
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the profile to delete.
 *     responses:
 *       204:
 *         description: Profile deleted successfully.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/api/profiles/:profileId', ProfileController.deleteProfile);

module.exports = router;
