const Room = require("../classes/battle/Room");
const BotHandler = require("../classes/battle/BotHandler");
const { checkJwtSocket } = require("../middlewares/authMiddleware");



class SocketHandler {
  constructor(io) {
    this.io = io;
    this.botHandler = new BotHandler(io);
    this.rooms = {};
    this.actionQueue = {}; // Add an action queue for each room
  }

  initializeSocketEvents() {
    this.io.use((socket, next) => {
      checkJwtSocket(socket, next);
    });

    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      socket.on("joinRoom", (roomId) => this.handleJoinRoom(socket, roomId));
      socket.on("playCardRequest", (userCard) => this.handlePlayCardToFieldRequest(socket, userCard));
      socket.on("readyForBattle", () => this.handleReadyForBattleRequest(socket));
      socket.on("gameEvent", (roomId, eventData) => this.handleGameEvent(roomId, eventData));
      socket.on("disconnect", () => this.handleDisconnect(socket));
      socket.on("attackCardRequest", (userCard) => this.handleAttackCardRequest(socket, userCard));
    });
  }

  handleJoinRoom(socket, roomId) {
    if (!socket?.user?._id) {
      socket.emit('error', { message: 'Invalid user session' });
      return;
    }

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
    this.addToActionQueue(roomId, eventData);
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

  handleAttackCardRequest(socket, userCard) {
    const room = Room.findRoomByPlayerId(socket.user._id);
    if (!room) {
      console.error(`User ${socket.user._id} is not in a room`);
      return;
    }

    const [attackerCard, attackedCard] = room.attackCard(socket.user._id, userCard.cardId);
    if (!attackedCard) {
      console.error(`User ${socket.user._id} could not attack card ${userCard.cardId}`);
      return;
    }

    this.addToActionQueue(room.id, {
      turn: room.turn,
      actionType: "attackCard",
      playerId: socket.user._id,
      initiatorCard: attackerCard,
      targetCardList: [attackedCard],
    });

    // if blood is 0 or less,  send unalive action
    if (attackedCard.blood <= 0) {
      this.addToActionQueue(room.id, {
        turn: room.turn,
        actionType: "unAlive",
        playerId: socket.user._id,
        targetCardList: [attackedCard],
      });
    }

    // if (!room.isPvP) {
    //   const botDrawnCard = this.handleDrawCardRequest(socket, room.player2.id);
    //   var botAction = this.botHandler.handleBotTurn(room, botDrawnCard);
    //   this.addToActionQueue(room.id, botAction);
    //   this.handleDrawCardRequest(socket, socket.user._id);
    // }
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

    this.addToActionQueue(room.id, {
      turn: room.turn++,
      actionType: "drawCard",
      playerId: playerId,
      initiatorCard: drawnCard,
    });

    return drawnCard;
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

    this.addToActionQueue(room.id, {
      turn: room.turn,
      actionType: "playCard",
      playerId: socket.user._id,
      initiatorCard: playedCard,
    });

    if (!room.isPvP) {
      const botDrawnCard = this.handleDrawCardRequest(socket, room.player2.id);
      var botAction = this.botHandler.handleBotTurn(room, botDrawnCard);
      this.addToActionQueue(room.id, botAction);
      this.handleDrawCardRequest(socket, socket.user._id);
    } else {
      this.handleDrawCardRequest(socket, room.getNextPlayerId(socket.user._id));
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
      this.handleDrawCardRequest(socket, socket.user._id);
    }
  }

  addToActionQueue(roomId, action) {
    if (!this.actionQueue[roomId]) {
      this.actionQueue[roomId] = [];
    }
    console.log(`Adding action to queue for room ${roomId}: ${JSON.stringify(action)}`);
    this.actionQueue[roomId].push(action);

    // Emit batched actions after a short delay
    setTimeout(() => {
      if (this.actionQueue[roomId].length > 0) {
        this.io.to(roomId).emit("actions", this.actionQueue[roomId]);
        this.actionQueue[roomId] = [];
      }
    }, 100); // Adjust the delay as needed
  }
}

module.exports = SocketHandler;