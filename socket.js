/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

const http = require('http');
const Room = require('./classes/RoomClass');
const server = http.createServer();
const io = require('socket.io')(server);

const PORT = process.env.SOCKET_PORT || 5050;

// Store room data
const rooms = {};

io.on('connection', (socket) => {
   console.log(`User connected: ${socket.id}`);

   // Join a room
   socket.on('joinRoom', (roomId) => {
      const room = Room.findRoomById(roomId);
      console.log(`RoomID : ${roomId}`);
      console.log(`Player ${room.player1_id} joined room ${roomId}`);
      
      if (room) {
         // Add the player to the room
         room.players[socket.id] = playerId;
         socket.join(roomId);
         io.to(roomId).emit('playerJoined', playerId);
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


