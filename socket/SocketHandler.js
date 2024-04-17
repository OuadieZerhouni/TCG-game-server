const Room = require('../classes/Room');

class SocketHandler {
  constructor(io) {
    this.io = io;
    this.rooms = {}; // This could also be moved to a separate RoomManager if needed
  }

  initializeSocketEvents() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      socket.on("joinRoom", (roomId) => this.handleJoinRoom(socket, roomId));
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
      room.deck2?.populate("cards.cardId");

      room.deck1?.cards.forEach((card) => {
        let cardData = {
          id: card._id.toString(),
          name: card.cardId.name,
          attack: card.attack,
          blood: card.blood,
          abilities: card.abilities,
        };
        gameData.deck1.push(cardData);
      });
      room.deck2?.cards.forEach((card) => {
        let cardData = {
          id: card._id.toString(),
          name: card.cardId.name,
          attack: card.attack,
          blood: card.blood,
          abilities: card.unlockedAbilities,
        };
        gameData.deck2.push(cardData);
      });
      console.log("gameData.deck1: ", gameData.deck1);
      // Draw a random card from the current player's deck
      if (currentPlayerTurn === "first" && gameData.deck1.length > 0) {
        console.log("first");
        const randomIndex = Math.floor(Math.random() * gameData.deck1.length);
        gameData.drawnCard = gameData.deck1.splice(randomIndex, 1)[0].id; // Remove the drawn card from the deck
      } else if (currentPlayerTurn === "second" && gameData.deck2.length > 0) {
        const randomIndex = Math.floor(Math.random() * gameData.deck2.length);
        gameData.drawnCard = gameData.deck2[randomIndex].id;
        console.log("second: ", gameData.deck2);
        console.log("second");
        console.log("gameData.drawnCard ", gameData.drawnCard);
      }

      //  console.log('sending game action to room: ', gameData);
      socket.emit("gameAction", gameData);
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
}

module.exports = SocketHandler;
