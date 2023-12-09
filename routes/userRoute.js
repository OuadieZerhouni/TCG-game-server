const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { checkJwt } = require('../middlewares/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users.
 */

/**
 * @swagger
 * :
 *   get:
 *     summary: Get a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of user objects.
 *       500:
 *         description: Internal server error.
 */
router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /{userId}:
 *   get:
 *     summary: Get a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user object.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:userId', UserController.getUserById);

router.post('/login', UserController.loginUser);
/**
 * @swagger
 * :
 *   post:
 *     summary: Create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.post('/',
UserController.createUser);



/**
 * @swagger
 * /{userId}:
 *   put:
 *     summary: Update a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Internal server error.
 */
router.put('/:userId', UserController.updateUser);

/**
 * @swagger
 * /{userId}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:userId', UserController.deleteUser);

module.exports = router;
