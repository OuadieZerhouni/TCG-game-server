/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:48 */

const Room = require('./models/Room'); // Adjust the path to your Room model file as needed

// Create a new room and save it to the database
async function createRoom(player1Id, player2Id) {
  const room = new Room({
    player1: player1Id,
    player2: player2Id,
    winner: 0, // Initialize with a draw
    start: new Date(),
    duration: 0, // Initialize with 0 duration
  });

  try {
    const savedRoom = await room.save();
    return savedRoom;
  } catch (error) {
    throw error;
  }
}

// Update the room with the winner and duration
async function updateRoom(roomId, winner, duration) {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        winner,
        duration,
      },
      { new: true } // Return the updated room
    );

    if (!updatedRoom) {
      throw new Error('Room not found');
    }

    return updatedRoom;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoom,
  updateRoom,
};
