/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const DeckService = require('../services/deckService');
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
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
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
   * Login or register a user using Google Play Games ID.
   *
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async loginWithGooglePlay(req, res) {
    try {
      // Extract user info from the request body sent by the client
      // This now expects the PlayGameUserInfo structure
      const { userId, userName, userImageUrl } = req.body;
      console.log('Received Google Play user data:', req.body);

      if (!userId) {
        // Renamed from googlePlayId to userId for clarity based on client data
        return res.status(400).json({ message: 'Google Play User ID is required' });
      }

      // Find user by Google Play ID (which is the userId from the client)
      let user = await UserService.findUserByGooglePlayId(userId);
      let isNewAccount = false; // Flag to indicate if a new account was created

      // If no user found, create a new one
      if (!user) {
        isNewAccount = true;
        // Create a new user with Google Play ID
        const newDeck = await DeckService.createDeck();
        const userData = {
          // Use userName from Play Games if available, otherwise generate a default
          username: userName || `Player${Math.floor(Math.random() * 100000)}`,
          // Email might not be provided by Play Games, handle accordingly
          email: '', // Set to empty or handle as needed by your schema
          googlePlayId: userId, // Store the Google Play User ID
          // Add other default fields as before
          rank: -1,
          quote: '',
          deck: newDeck._id,
          diamondAmount: 100,
          goldAmount: 10000,
          equipments: [],
          userCards: [],
          // You might want to store the avatar URL if available
          avatar: userImageUrl || '', // Store the image URL if provided
        };

        user = await UserService.createUser(userData);
      }

      // Generate token and return user data
      const payload = {
        user: {
          _id: user._id,
        },
      };

      // Prepare the user data to send back to the client
      const responseUserData = {
        _id: user._id, // Include user ID
        username: user.username,
        email: user.email,
        level: user.level,
        xp: user.xp,
        friends: user.friends,
        avatar: user.avatar,
        googlePlayId: user.googlePlayId, // Ensure googlePlayId is included
        // Include other relevant fields like gold, diamonds, etc.
        goldAmount: user.goldAmount,
        diamondAmount: user.diamondAmount,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 }, // Consider adjusting token expiration
        (err, token) => {
          if (err) throw err;
          // Send back token, user data, and whether it's a new account
          res.status(isNewAccount ? 201 : 200).json({
            token,
            user: responseUserData,
            isNewAccount: isNewAccount // Inform client if account was just created
          });
        }
      );
    } catch (error) {
      console.error('Google Play authentication error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  /**
   * Login a user.
   * 
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
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
            _id: user._id,
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

        // const userProfile = await ProfileService.findProfileByUserId(user.id);
        // if (userProfile) {
        //   userData.deck = userProfile.deck;
        //   userData.kingdomId = userProfile.kingdomId;
        //   userData.rank = userProfile.rank;
        // }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ token , user: userData});
          }
        );
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get the current user.
   *
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getCurrentUser(req, res) {
    const userId = req.user._id;
    const user = await UserService.findUserById(userId, true);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      user.password = undefined;
      res.status(200).json(user);
    }
  }

  /**
   * Get a user by ID.
   *
   * @param {Express.Request} req - The request object.
   * @param {Express.Response} res - The response object.
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
      let userData  = req.body;
      const newDeck = await DeckService.createDeck();
      const initUserData  = {
        rank         : -1,
        quote        : '',
        deck         : newDeck._id,
        diamondAmount: 100,
        goldAmount   : 10000,
        equipments   : [],
        userCards        : [],
      }
      userData             = { ...userData, ...initUserData }
      const createdUser    = await UserService.createUser(userData);
      createdUser.password = undefined;
      const playload       = {
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
   * Check if a user exists by email and username.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   */
  static async checkUserExist(req, res) {
    const { email, username } = req.body;

    try {
      // Check if email and username exist in the database
      const existingUserByEmail = await UserService.findUserByEmail(email);
      const existingUserByUsername = await UserService.findUserByUsername(username);

      if (existingUserByEmail && existingUserByUsername) {
        return res.status(400).json({ message: 'Email and username already exist' });
      } else if (existingUserByUsername) {
        return res.status(400).json({ message: 'Username already exist' });
      } else if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email already used' });
      } else {
        return res.status(200).json({ message: 'User is new' });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

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
