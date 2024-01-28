/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const deckService = require('../services/deckService');
const cardSevice = require('../services/cardService');
const userCardService = require('../services/userCardService');

/**
 * Controller for managing deck operations.
 */
class DeckController {
  /**
   * Get a list of all decks.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getAllDecks(req, res) {
    try {
      const decks = await deckService.getAllDecks();
      

      res.status(200).json(decks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Get a deck by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async getDeckById(req, res) {
    try {
      const deckId = req.params.deckId;
      const deck = await deckService.findDeckById(deckId);
      if (!deck) {
        res.status(404).send('Deck not found');
      } else {
        res.status(200).json(deck);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  /**
   * Create a new deck.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async createDeck(req, res) {
    try {
      const deckData = req.body;
      const createdDeck = await deckService.createDeck(deckData);
      res.status(201).json(createdDeck);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

/**
 * Update a deck by ID.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
static async updateDeck(req, res) {
  try {
    const deckId = req.params.deckId;
    const { cardsToAdd, cardsToRemove } = req.body;
    console.log(req.body);
    // Find the deck by ID
    const deck = await deckService.findDeckById(deckId);
    if (!deck) {
      res.status(404).send('Deck not found');
      return;
    }

    // Create UserCard objects for cards to add and get their IDs
    const userCardIdsToAdd = [];
    for (const cardId of cardsToAdd) {
      const card = await cardSevice.findCardById(cardId);
      if (card) {
        const userCard = await userCardService.createUserCard({
          cardId            : cardId,
          attack            : card.baseAttack,
          blood             : card.baseBlood,
          unlockedAbilities : [],
        });
        console.log(userCard);
        userCardIdsToAdd.push(userCard._id);
      }
    }

    // Add userCardIdsToAdd to deck's userCards
    deck.cards.push(...userCardIdsToAdd);

    // Remove userCardsToRemove from deck's userCards
    deck.cards = deck.cards.filter((userCardId) => !cardsToRemove?.includes(userCardId.toString()));

    // Save the updated deck
    await deck.save();

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


  /**
   * Delete a deck by ID.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>}
   */
  static async deleteDeck(req, res) {
    try {
      const deckId = req.params.deckId;
      const deleted = await deckService.deleteDeck(deckId);
      if (!deleted) {
        res.status(404).send('Deck not found');
      } else {
        res.status(204).send('Deck deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = DeckController;
