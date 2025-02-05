/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */

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
    winner: -1, // Initialize with -1 for no winner
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

// Update room with winner index and duration
async function updateRoom(roomId, winnerIndex, duration) {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // Validate winner index
    if (winnerIndex !== -1 && (winnerIndex < 0 || winnerIndex >= room.players.length)) {
      throw new Error('Invalid winner index');
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        winner: winnerIndex,
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
