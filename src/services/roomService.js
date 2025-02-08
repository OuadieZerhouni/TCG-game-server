const Room = require('../models/Room');

// Create a new room with array of players
/**
 * 
 * @param {*} playerIds 
 * @returns {Room}
 */
async function createRoom(playerIds) {
  // if (!Array.isArray(playerIds) || playerIds.length < 2) {
  //   throw new Error('At least 2 players are required');
  // }

  const room = new Room({
    players: playerIds,
    winner: null, // Initialize with null for no winner
    start: new Date(),
    duration: 0,
  });

  try {
    const savedRoom = await room.save();
    return savedRoom;
  } catch (error) {
    throw error;
  }
}

// Update room with winner and duration
async function updateRoom(roomId, winnerId, winnerModel, duration) {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        winner: winnerId,
        winnerModel: winnerModel,
        duration,
      },
      { new: true }
    );

    return updatedRoom;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoom,
  updateRoom,
};