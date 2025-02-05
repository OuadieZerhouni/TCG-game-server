const express = require('express');
const router = express.Router();
const levelService = require('../services/levelService');
const roomService = require('../services/roomService');
const BattleSession = require('../classes/battle/BattleSession');
const { decodeToken } = require('../services/jwtServices');
const UserService = require('../services/userService');
const { v4: uuidv4 } = require('uuid');
const DeckService = require('../services/deckService');

/**
 * Creates a new BattleSession for the user to play a battle.
 */
router.post('/', async (req, res) => {
  try {
    const token = req.header('authorization').split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    const userId = decodeToken(token);
    const player1 = await UserService.findUserById(userId, true);
    const battleType = req.body.battleType;

    if (battleType === 'offline') {
      const level = await levelService.findLevelByStringId(req.body.level);
      const deck1 = player1.deck;
      const deck2 = level.deck;
      /** @type {Room} */
      const room = await roomService.createRoom([player1.id]);
      const battleSession = new BattleSession(room._id.toString(), player1.id, level._id, 1, 0, new Date(), deck1, deck2, 2000, 2000, false);
      res.status(201).json({ battleSessionId: room._id.toString(), port: process.env.SOCKET_PORT });
    }
    // else if (battleType === 'online') {
    //   const player2 = await UserService.findUserById(req.body.player2Id);
    //   const deck1 = await DeckService.findDeckById(player1.deck);
    //   const deck2 = await DeckService.findDeckById(player2.deck);
    //   const roomId = uuidv4();
    //   const room = new BattleSession(roomId, player1.id, player2.id, 1, 0, new Date(), deck1, deck2, 2000, 2000);
    //   res.status(201).json({ roomId });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error);
  }
});

module.exports = router;
