/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const http = require('http');
const Room = require('./classes/RoomClass');
const server = http.createServer();
const io = require('socket.io')(server);
const User = require('./models/user');
const Level = require('./models/level');

const PORT = process.env.SOCKET_PORT || 5050;

// Store room data
const rooms = {};

io.on('connection', (socket) => {
   console.log(`User connected: ${socket.id}`);

   // Join a room
   socket.on('joinRoom', async (roomId) => {
      console.log(`User ${socket.id} joining room ${roomId}`);
      const room = Room.findRoomById(roomId);
      if (room) {
         // Add the player to the room
         socket.join(roomId);
         InitialData = { deck1: [], deck2: [] };
         // populate cards.cardid with the card data
         room.deck2?.populate('cards.cardId');

         room.deck2?.cards.forEach(card => {
            cardData = {
               name: card.cardId.name,
               attack: card.attack,
               blood: card.blood,
               abilities: card.abilities,
            };
            InitialData.deck1.push(cardData);
         });
         room.deck2?.cards.forEach(card => {
            cardData = {
               name: card.cardId.name,
               attack: card.attack,
               blood: card.blood,
               abilities: card.unlockedAbilities,
            };
            InitialData.deck2.push(cardData);
         });
         console.log('sending initial data to room: ', InitialData);
         socket.emit('initialData', InitialData);
         // io.to(roomId).broadcast.emit('initialData',  InitialData);
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


