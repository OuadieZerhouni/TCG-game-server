const express = require('express');
const router = express.Router();
const { decodeToken } = require('../services/jwtServices');
const { createOfflineBattleSession } = require('../services/battleService');
const dependencies = require('../config/dependencyContainer');

/**
 * Creates a new BattleSession for the user to play a battle.
 */
router.post('/', async (req, res) => {
  try {
    const token = req.header('authorization') && req.header('authorization').split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    const userId = dependencies.jwtServices.decodeToken(token) || decodeToken(token);
    const player1 = await dependencies.UserService.findUserById(userId, true);
    const battleType = req.body.battleType;

    if (battleType === 'offline') {
      const battleSessionId = await createOfflineBattleSession(player1, req.body.level, dependencies);
      res.status(201).json({ battleSessionId });
    }
    // else if (battleType === 'online') {
    // Similar offline pattern can be applied here.
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error: ' + error);
  }
});

module.exports = router;