const { checkJwtSocket } = require('../middlewares/authMiddleware');
require('dotenv').config();
const Room = require('../classes/battle/Room');

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
        socket.on("readyForBattle", () => this.handleReadyForBattleRequest(socket));
        socket.on("gameEvent", (roomId, eventData) =>
          this.handleGameEvent(roomId, eventData)
        );
        socket.on("disconnect", () => this.handleDisconnect(socket));
      });
  }

  handleJoinRoom(socket, roomId) {
    const room = Room.findRoomById(roomId);
    if (room) {
      // Add the player to the room

      socket.join(roomId);
      console.log(`User ${socket.id} joining room ${roomId}`);
      let gameData = {
        deck1: [],
        deck2: [],
        drawnCard: null,
        initialData: true,
        localPlayerId: socket.user._id,
        OpponentId: room.player1.id === socket.user._id ? room.player2.id : room.player1.id,
      };
      // Populate cards.cardId with the card data
      room.player1.deck?.populate("cards.cardId");
      room.player2.deck?.populate("cards.cardId");

      room.player1.deck.cards.forEach((card) => {
        gameData.deck1.push(card);
      });
      room.player2.deck.cards.forEach((card) => {
        gameData.deck2.push(card);
      });

      socket.emit("initialAction", gameData);
    console.log(`User ${socket.id} joining room ${roomId}`);

    } else {
      socket.emit("roomNotFound", roomId);
      console.error(`Room ${roomId} not found for user ${socket.id}`);
    }
  }

  handleGameEvent(roomId, eventData) {
    console.log(`Event in room ${roomId}: ${JSON.stringify(eventData)}`);
    this.io.to(roomId).emit("gameEvent", eventData);
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
    const room = Room.findRoomByPlayerId(socket.user._id);
    room?.readyPlayers.pop(socket.user._id);
    if(room?.readyPlayers.length === 0) {
      Room.deleteRoomById(room.Id);
    }
  }

  handleDrawCardRequest(socket) {
    // get the room
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }
    const drawnCard = room.drawCard(socket.user._id);
    if (drawnCard) {
      this.io.to(room.Id).emit("action", {
        turn: room.turn++,
        actionType: "drawCard",
        playerId: socket.user._id,
        initiatorId: drawnCard._id,
      });
    } else {
      console.error(`User ${socket.user._id} could not draw a card`);
    }
  }

  /**
   * 
   * @param {Socket} socket - The socket of the player
   * @param {object} userCard - The card the player wants to play
   */
  handlePlayCardToFieldRequest(socket, userCard) {
    // get the room
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }
    const playedCard = room.playCardToField(socket.user._id, userCard.cardId);
    if (playedCard) {
      console.log(`User ${socket.user._id} played card ${userCard.cardId}`);
      this.io.to(room.Id).emit("action", {
        turn: room.turn++,
        actionType: "playCard",
        playerId: socket.user._id,
        initiatorId: playedCard._id,
      });
    } else {
      console.error(`User ${socket.user._id} could not play card ${userCard.cardId}`);
    }
  }

  // Update handleReadyForBattleRequest in SocketHandler
  handleReadyForBattleRequest(socket) {
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }
    room.readyPlayers.push(socket.user._id);

    if ((room.isPvP && room.readyPlayers.length === 2) || (!room.isPvP && room.readyPlayers.length === 1)) {
      this.handleDrawCardRequest(socket);
    }
  }
}

module.exports = SocketHandler;