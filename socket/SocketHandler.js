const Room = require('../classes/Room');
const { checkJwtSocket } = require('../middlewares/authMiddleware');
require('dotenv').config();

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.rooms = {}; // This could also be moved to a separate RoomManager if needed
  }

  initializeSocketEvents() {
    this.io
      .use(checkJwtSocket)
      .on("connection", (socket) => {
        // add the player to the playerSockets object
        console.log(`User connected: ${socket.id}`);
        socket.on("joinRoom", (roomId) => this.handleJoinRoom(socket, roomId));
        socket.on("playCardRequest", (userCard) =>
          this.handlePlayCardToFieldRequest(socket, userCard)
        );
        socket.on("gameEvent", (roomId, eventData) =>
          this.handleGameEvent(roomId, eventData)
        );
        socket.on("disconnect", () => this.handleDisconnect(socket));
      });
  }

  handleJoinRoom(socket, roomId) {
    console.log(`User ${socket.id} joining room ${roomId}`);
    const room = Room.findRoomById(roomId);
    if (room) {
      // Add the player to the room
      socket.join(roomId);
      let gameData = {
        deck1: [],
        deck2: [],
        drawnCard: null,
        initialData: true,
      };
      // Determine whose turn it is
      const currentPlayerTurn = room.turn % 2 === 0 ? "first" : "second";

      // Populate cards.cardId with the card data
      room.player1.deck?.populate("cards.cardId");
      room.player2.deck?.populate("cards.cardId");

      room.player1.deck.cards.forEach((card) => {
        gameData.deck1.push(card);
      });
      room.player2.deck.cards.forEach((card) => {
        gameData.deck2.push(card);
      });

      // Draw a random card from the current player's deck
      // if (currentPlayerTurn === "first" && gameData.deck1.length > 0) {
      // const randomIndex = Math.floor(Math.random() * gameData.deck1.length);
      gameData.drawnCard = room.drawCard(room.player1.id)._id;
      // }
      // else if (currentPlayerTurn === "second" && gameData.deck2.length > 0) {
      //   const randomIndex = Math.floor(Math.random() * gameData.deck2.length);
      //   gameData.drawnCard = gameData.deck2[randomIndex].id;
      // }

      socket.emit("initialAction", gameData);
    } else {
      socket.emit("roomNotFound", roomId);
    }
  }

  handleGameEvent(roomId, eventData) {
    console.log(`Event in room ${roomId}: ${JSON.stringify(eventData)}`);
    this.io.to(roomId).emit("gameEvent", eventData);
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
    // Todo: Remove the player from the room if they were in one
  }

  /**
   * 
   * @param {Socket} socket - The socket of the player
   * @param {object} userCard - The card the player wants to play
   */
  handlePlayCardToFieldRequest(socket, userCard) {
    console.log(socket.user);
    // get the room
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }
    room.playCardToField(socket.user._id, userCard.cardId);
  }
}

module.exports = SocketHandler;
