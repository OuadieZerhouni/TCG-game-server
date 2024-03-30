/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const CardService = require('../services/cardService');
const DeckService = require('../services/deckService');
const UserCardService = require('../services/userCardService');
const UserService = require('../services/userService');

/**
 * Controller for managing user card operations.
 */
class UserCardController {
  /**
   * Get a list of all user cards.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllUserCards(req, res) {
    try {
      const userCards = await UserCardService.getAllUserCards();
      res.status(200).json(userCards);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a random user card from the database.
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getOneRandomUserCard(req, res) {

    const user = await UserService.findUserById(req.user._id);
    // get a random user card from the database
    const card = await CardService.getOneRandomCard();
    const userCard = await UserCardService.createNewUserCardFromCard(card);
    DeckService.addUserCardToDeck(user.deck, userCard);
    // console.log(userCard);
    res.status(200).json(userCard);
  }

  /**
   * Get a user card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getUserCardById(req, res) {
    try {
      const userCardId = req.params.userCardId;
      const userCard = await UserCardService.findUserCardById(userCardId);
      if (!userCard) {
        res.status(404).send('User card not found');
      } else {
        res.status(200).json(userCard);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new user card.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createUserCard(req, res) {
    try {
      const userCardData = req.body;
      const createdUserCard = await UserCardService.createUserCard(userCardData);
      res.status(201).json(createdUserCard);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a user card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateUserCard(req, res) {
    try {
      const userCardId = req.params.userCardId;
      const updatedData = req.body;
      const updatedUserCard = await UserCardService.updateUserCard(userCardId, updatedData);
      if (!updatedUserCard) {
        res.status(404).send('User card not found');
      } else {
        res.status(200).json(updatedUserCard);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a user card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteUserCard(req, res) {
    try {
      const userCardId = req.params.userCardId;
      const deleted = await UserCardService.deleteUserCard(userCardId);
      if (!deleted) {
        res.status(404).send('User card not found');
      } else {
        res.status(204).send('User card deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UserCardController;
