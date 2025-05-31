/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */



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
 * /api/users:
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
router.post('/', UserController.createUser);

/**
 * @swagger
 * /api/users/check:
 *   get:
 *     summary: Check if a user exists by email and username.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to check.
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to check.
 *     responses:
 *       200:
 *         description: User exists.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/check', UserController.checkUserExist);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login. Returns a token.
 *       400:
 *         description: Invalid credentials provided.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', UserController.loginUser);

/**
 * @swagger
 * /api/users/login/googleplay:
 *   post:
 *     summary: Login using Google Play Games ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googlePlayId:
 *                 type: string
 *                 description: The Google Play Games user ID
 *     responses:
 *       200:
 *         description: Successful login. Returns a token and user data.
 *       404:
 *         description: User not found. Account may need to be created or linked.
 *       500:
 *         description: Internal server error.
 */
router.post('/login/googlePlay', UserController.loginWithGooglePlay);

router.use(checkJwt);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of user objects.
 *       500:
 *         description: Internal server error.
 */
// router.get('/', UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
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


router.get('/current/user', UserController.getCurrentUser);

/**
 * @swagger
 * /api/users/{userId}:
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
 * /api/users/{userId}:
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
