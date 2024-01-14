const express = require('express');
const multer = require('multer');
const router = express.Router();
const AbilityController = require('../controllers/abilityController.js');
// Configure multer for file handling
const upload = multer({ storage: multer.memoryStorage() });
/**
 * @swagger
 * tags:
 *   name: Abilities
 *   description: API for managing abilities.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of all abilities.
 *     tags: [Abilities]
 *     responses:
 *       200:
 *         description: A list of ability objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', AbilityController.getAllAbilities);

/**
 * @swagger
 * /{abilityId}:
 *   get:
 *     summary: Get an ability by ID.
 *     tags: [Abilities]
 *     parameters:
 *       - in: path
 *         name: abilityId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ability to retrieve.
 *     responses:
 *       200:
 *         description: The ability object.
 *       404:
 *         description: Ability not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:abilityId', AbilityController.getAbilityById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new ability.
 *     tags: [Abilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ability'
 *     responses:
 *       201:
 *         description: The created ability.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', upload.single('image'), AbilityController.createAbility);

/**
 * @swagger
 * /{abilityId}:
 *   put:
 *     summary: Update an ability by ID.
 *     tags: [Abilities]
 *     parameters:
 *       - in: path
 *         name: abilityId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ability to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ability'
 *     responses:
 *       200:
 *         description: The updated ability.
 *       404:
 *         description: Ability not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:abilityId', AbilityController.updateAbility);

/**
 * @swagger
 * /{abilityId}:
 *   delete:
 *     summary: Delete an ability by ID.
 *     tags: [Abilities]
 *     parameters:
 *       - in: path
 *         name: abilityId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ability to delete.
 *     responses:
 *       204:
 *         description: Ability deleted successfully.
 *       404:
 *         description: Ability not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:abilityId', AbilityController.deleteAbility);

module.exports = router;
