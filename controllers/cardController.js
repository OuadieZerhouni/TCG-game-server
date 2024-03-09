/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const CardService = require('../services/cardService');
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);


/**
 * Controller for managing card operations.
 */
class CardController {
  /**
   * Get a list of all cards.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllCards(req, res) {
    try {
      const cards = await CardService.getAllCards();
      res.status(200).json(cards);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * getAllCardsNames
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} resolve with a list of all cards names
   */
  static async getAllCardsNames(req, res) {
    try {
      const cards = await CardService.getAllCardsNames();
      res.status(200).json({ cardsNames: cards.map(card => card.name) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getCardById(req, res) {
    try {
      const cardId = req.params.cardId;
      const card = await CardService.findCardById(cardId);
      if (!card) {
        res.status(404).send('Card not found');
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new card.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createCard(req, res) {
    try {
      const cardData = req.body;
      const createdCard = await CardService.createCard(cardData);
      console.log(req.file);
      // Save the image data as a PNG file with the function name as the filename
      if (req.file) {
        // Remove the data URI prefix and decode the base64 string
        const base64Image = req.file.buffer.toString('utf8').replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Image, 'base64');

        const imagePath = path.join(__dirname, `../data/cards/${createdCard.name}.png`);

        // Write the decoded buffer to a file
        await writeFileAsync(imagePath, imageBuffer);

        // Include the image path in the response if needed
        createdCard.image = imagePath;
      }
      res.status(201).json(createdCard);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Update a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async updateCard(req, res) {
    try {
      const cardId = req.params.cardId;
      const updatedData = req.body;
      const updatedCard = await CardService.updateCard(cardId, updatedData);
      if (!updatedCard) {
        res.status(404).send('Card not found');
      } else {
        res.status(200).json(updatedCard);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Delete a card by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteCard(req, res) {
    try {
      const cardId = req.params.cardId;
      const deleted = await CardService.deleteCard(cardId);
      if (!deleted) {
        res.status(404).send('Card not found');
      } else {
        const imagePath = path.join(__dirname, `../data/cards/${deleted.name}.png`);
        //unlink file if exists
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        res.status(204).send('Card deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = CardController;
