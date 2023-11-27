const express = require('express');
const router = express.Router();
const AbilityController = require('../controllers/abilityController.js');

/**
 * @swagger
 * tags:
 *   name: Abilities
 *   description: API for managing abilities.
 */

/**
 * @swagger
 * /api/abilities:
 *   get:
 *     summary: Get a list of all abilities.
 *     tags: [Abilities]
 *     responses:
 *       200:
 *         description: A list of ability objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/abilities', AbilityController.getAllAbilities);

/**
 * @swagger
 * /api/abilities/{abilityId}:
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
router.get('/api/abilities/:abilityId', AbilityController.getAbilityById);

/**
 * @swagger
 * /api/abilities:
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
router.post('/api/abilities', AbilityController.createAbility);

/**
 * @swagger
 * /api/abilities/{abilityId}:
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
router.put('/api/abilities/:abilityId', AbilityController.updateAbility);

/**
 * @swagger
 * /api/abilities/{abilityId}:
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
router.delete('/api/abilities/:abilityId', AbilityController.deleteAbility);

module.exports = router;
