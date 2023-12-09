const ProfileService = require('../services/ProfileService');
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Controller for managing user operations.
 */
class UserController {
  /**
   * Get a list of all users.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Login a user.
   * 
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */

  static async loginUser(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.loginUser(userData);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        const payload = {
          user: {
            id: user.id,
          },
        };
        const  userData = {
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          friends: user.friends,
          avatar: user.avatar,
        }

        const userProfile = await ProfileService.findProfileByUserId(user.id);
        if (userProfile) {
          userData.deck = userProfile.deck;
          userData.kingdomId = userProfile.kingdomId;
          userData.rank = userProfile.rank;
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ token , user: userData, profile: userProfile });
          }
        );
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  /**
   * Get a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserById(req, res) {
    try {
      const userId = req.params.userId;
      const user = await UserService.findUserById(userId);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new user.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createUser(req, res) {
    try {
      const userData       = req.body;
      const createdUser    = await UserService.createUser(userData);
      const createdProfile = await ProfileService.createProfile({
        userId: createdUser.id,
        rank: -1,
        quote: '',
        diamondAmount: 100,
        goldAmount: 10000,
        equipments: [],
      });

      createdUser.password = undefined;

      const playload = {
        user: {
          id: createdUser.id,
        },
      };
      jwt.sign(
        playload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token, user: createdUser, profile: createdProfile });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;
      const updatedUser = await UserService.updateUser(userId, updatedData);
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a user by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).send('User not found');
      } else {
        res.status(204).send('User deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UserController;
