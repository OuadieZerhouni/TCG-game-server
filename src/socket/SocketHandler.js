const { checkJwtSocket } = require('../middlewares/authMiddleware');
require('dotenv').config();
const Room = require('../classes/battle/Room');
const BotHandler = require('../classes/battle/BotHandler'); // Import the BotHandler

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.botHandler = new BotHandler(io); // Initialize the BotHandler
    this.rooms = {}; // This could also be moved to a separate RoomManager if needed
  }

  initializeSocketEvents() {
    this.io
      .use(checkJwtSocket)
      .on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.on("joinRoom", (roomId) => this.handleJoinRoom(socket, roomId));
        socket.on("playCardRequest", (userCard) => this.handlePlayCardToFieldRequest(socket, userCard));
        socket.on("readyForBattle", () => this.handleReadyForBattleRequest(socket));
        socket.on("gameEvent", (roomId, eventData) => this.handleGameEvent(roomId, eventData));
        socket.on("disconnect", () => this.handleDisconnect(socket));
      });
  }

  handleJoinRoom(socket, roomId) {
    const room = Room.findRoomById(roomId);
    if (!room) {
      socket.emit("roomNotFound", roomId);
      console.error(`Room ${roomId} not found for user ${socket.id}`);
      return;
    }

    socket.join(roomId);
    console.log(`User ${socket.id} joining room ${roomId}`);

    const gameData = {
      deck1: room.player1.deck.cards,
      deck2: room.player2.deck.cards,
      drawnCard: null,
      initialData: true,
      localPlayerId: socket.user._id,
      OpponentId: room.player1.id === socket.user._id ? room.player2.id : room.player1.id,
    };

    socket.emit("initialAction", gameData);
  }

  handleGameEvent(roomId, eventData) {
    console.log(`Event in room ${roomId}: ${JSON.stringify(eventData)}`);
    this.io.to(roomId).emit("gameEvent", eventData);
  }

  handleDisconnect(socket) {
    console.log(`User disconnected: ${socket.id}`);
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (room) {
      room.readyPlayers = room.readyPlayers.filter((id) => id !== socket.user._id);
      if (room.readyPlayers.length === 0) {
        Room.deleteRoomById(room.id);
      }
    }
  }

  handleDrawCardRequest(socket, playerId) {
    const room = Room.findRoomByPlayerId(playerId);
    if (!room) {
      console.error(`User ${playerId} is not in a room`);
      return;
    }

    const drawnCard = room.drawCard(playerId);
    if (!drawnCard) {
      console.error(`User ${playerId} could not draw a card`);
      return;
    }

    this.io.to(room.id).emit("action", {
      turn: room.turn++,
      actionType: "drawCard",
      playerId: playerId,
      initiatorId: drawnCard.id,
    });

    return drawnCard; // Return the drawn card in case it's needed later
  }

  handlePlayCardToFieldRequest(socket, userCard) {
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }

    const playedCard = room.playCardToField(socket.user._id, userCard.cardId);
    if (!playedCard) {
      console.error(`User ${socket.user._id} could not play card ${userCard.cardId}`);
      return;
    }

    this.io.to(room.id).emit("action", {
      turn: room.turn,
      actionType: "playCard",
      playerId: socket.user._id,
      initiatorId: playedCard.id,
    });

    // After the player plays, check if it's a bot's turn and handle accordingly
    if (!room.isPvP) {
      const botDrawnCard = this.handleDrawCardRequest(socket, room.player2.id);
      this.botHandler.handleBotTurn(room, botDrawnCard); // Pass the drawn card to the bot's handler
      this.handleDrawCardRequest(socket, socket.user._id); // Draw a card for the player after the
    } else {
      this.handleDrawCardRequest(socket, room.getNextPlayerId(socket.user._id)); // Move to the next player's turn in PvP
    }
  }

  handleReadyForBattleRequest(socket) {
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }

    room.readyPlayers.push(socket.user._id);

    if ((room.isPvP && room.readyPlayers.length === 2) || (!room.isPvP && room.readyPlayers.length === 1)) {
      this.handleDrawCardRequest(socket, socket.user._id); // Draw card for the player who is ready
    }
  }
}

module.exports = SocketHandler;
