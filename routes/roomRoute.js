const express = require('express');
const router = express.Router();
const levelService = require('../services/levelService');
const Room = require('../classes/RoomClass');
const { decodeToken } = require('../services/jwtServices');
const UserService = require('../services/userService');
const { v4: uuidv4 } = require('uuid');
const DeckService = require('../services/deckService');


// create a room for user to play battleField 
// Todo: add case to verify user has access to level or battle / add online case and two player battle or more
router.post('/', async (req, res) => {
    try {
        const token = req.header('authorization').split(' ')[1];
        console.log(token);
        if(!token) return res.status(401).send('Access denied. No token provided.');
        const userId = decodeToken(token);
        const player1 = await UserService.findUserById(userId);
        const battleType = req.body.battleType;
        if (battleType === 'offline') {
            console.log(req.body);
            const level = levelService.findLevelByStringId(req.body.level);
            const deck1 = DeckService.findDeckById(player1.deck);
            const deck2 = DeckService.findDeckById(level.deck);
            const roomId = uuidv4();
            console.log(roomId);
            const room = new Room(roomId, player1.id, null, 1, 0, new Date(), deck1, deck2, 2000, 2000);
            res.status(201).json({ roomId: roomId });
        }
        // else if(battleType === 'online') {
        //     const player2 = UserService.findUserById(req.body.player2Id);
        //     const deck1 = DeckService.findDeckById(player1.deck);
        //     const deck2 = DeckService.findDeckById(player2.deck);
        //     const roomId = uuidv4();
        //     const room = new Room(roomId, player1.id, player2.id, 1, 0, new Date(), deck1, deck2, 2000, 2000);
        //     res.status(201).json({ roomId: roomId });
        // }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error: ' + error);
    }
});

module.exports = router;