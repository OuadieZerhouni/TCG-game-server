/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const http = require('http');
const Room = require('./classes/Room');
const server = http.createServer();
const io = require('socket.io')(server);
const User = require('./models/User');
const Level = require('./models/Level');

const PORT = process.env.SOCKET_PORT || 5050;

// Store room data
const rooms = {};

io.on('connection', (socket) => {
   console.log(`User connected: ${socket.id}`);

   socket.on('joinRoom', async (roomId) => {
      console.log(`User ${socket.id} joining room ${roomId}`);
      const room = Room.findRoomById(roomId);
      if (room) {
         // Add the player to the room
         socket.join(roomId);
         let gameData = { deck1: [], deck2: [], drawnCard: null, initialData: true };
         // Determine whose turn it is
         const currentPlayerTurn = room.turn % 2 === 0 ? 'first' : 'second';

         // Populate cards.cardId with the card data
         room.deck2?.populate('cards.cardId');

         room.deck1?.cards.forEach(card => {
            let cardData = {
               id: card._id.toString(),
               name: card.cardId.name,
               attack: card.attack,
               blood: card.blood,
               abilities: card.abilities,
            };
            gameData.deck1.push(cardData);
         });
         room.deck2?.cards.forEach(card => {
            let cardData = {
               id: card._id.toString(),
               name: card.cardId.name,
               attack: card.attack,
               blood: card.blood,
               abilities: card.unlockedAbilities,
            };
            gameData.deck2.push(cardData);
         });

         // Draw a random card from the current player's deck
         if (currentPlayerTurn === 'first' && gameData.deck1.length > 0) {
            console.log('first');
            const randomIndex = Math.floor(Math.random() * gameData.deck1.length);
            gameData.drawnCard = gameData.deck1.splice(randomIndex, 1)[0].id; // Remove the drawn card from the deck
         } else if (currentPlayerTurn === 'second' && gameData.deck2.length > 0) {
            const randomIndex = Math.floor(Math.random() * gameData.deck2.length);
            gameData.drawnCard = gameData.deck2[randomIndex].id;
            console.log('second: ', gameData.deck2);
            console.log('second');
            console.log('gameData.drawnCard ', gameData.drawnCard);
         }

         //  console.log('sending game action to room: ', gameData);
         socket.emit('gameAction', gameData);
      } else {
         socket.emit('roomNotFound', roomId);
      }
   });


   // Handle game events and broadcast to the room
   socket.on('gameEvent', (roomId, eventData) => {
      io.to(roomId).emit('gameEvent', eventData);
   });

   // Handle disconnect
   socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove the player from the room if they were in one
      for (const roomId in rooms) {
         if (rooms[roomId].players[socket.id]) {
            delete rooms[roomId].players[socket.id];
            io.to(roomId).emit('playerLeft', socket.id);
            break;
         }
      }
   });
});

server.listen(PORT, () => {
   console.log(`Socket.io server is running on port ${PORT}`);
});


