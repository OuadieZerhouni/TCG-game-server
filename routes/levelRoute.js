/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const express = require('express');
const multer = require('multer');
const router = express.Router();
const LevelController = require('../controllers/levelController.js'); // Import your Level controller

// Configure multer for file handling
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: API for managing levels.
 */

/**
 * @swagger
 * /levels:
 *   get:
 *     summary: Get a list of all levels.
 *     tags: [Levels]
 *     responses:
 *       200:
 *         description: A list of level objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', LevelController.getAllLevels);

/**
 * @swagger
 * /levels/{levelId}:
 *   get:
 *     summary: Get a level by ID.
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: levelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the level to retrieve.
 *     responses:
 *       200:
 *         description: The level object.
 *       404:
 *         description: Level not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:levelId', LevelController.getLevelById);

/**
 * @swagger
 * /levels:
 *   post:
 *     summary: Create a new level.
 *     tags: [Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     responses:
 *       201:
 *         description: The created level.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', upload.single('image'), LevelController.createLevel);

/**
 * @swagger
 * /levels/{levelId}:
 *   put:
 *     summary: Update a level by ID.
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: levelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the level to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Level'
 *     responses:
 *       200:
 *         description: The updated level.
 *       404:
 *         description: Level not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:levelId', LevelController.updateLevel);

/**
 * @swagger
 * /levels/{levelId}:
 *   delete:
 *     summary: Delete a level by ID.
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: levelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the level to delete.
 *     responses:
 *       204:
 *         description: Level deleted successfully.
 *       404:
 *         description: Level not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:levelId', LevelController.deleteLevel);

module.exports = router;
