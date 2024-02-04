/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

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
        if(!token) return res.status(401).send('Access denied. No token provided.');
        const userId = decodeToken(token);
        const player1 = await UserService.findUserById(userId);
        const battleType = req.body.battleType;
        if (battleType === 'offline') {
            const level = await levelService.findLevelByStringId(req.body.level);
            const deck1 = player1.deck;
            const deck2 = level.deck;
            const roomId = uuidv4();
            const room = new Room(roomId, player1.id, level._id, 1, 0, new Date(), deck1, deck2, 2000, 2000);
            res.status(201).json({ roomId: roomId , port : process.env.SOCKET_PORT});
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