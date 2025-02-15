async function createOfflineBattleSession(player, levelStringId, dependencies) {
    // Extract dependencies
    const { levelService, roomService, BattleSession } = dependencies;
    
    // Fetch level details and decks
    const level = await levelService.findLevelByStringId(levelStringId);
    const deck1 = player.deck;
    const deck2 = level.deck;
    
    // Create a room for the battle
    const room = await roomService.createRoom([player.id]);
    
    // Instantiate a new battle session
    // Adjust constructor calls and parameters as needed for your game logic.
    new BattleSession(
        room._id.toString(),
        player.id,
        level._id,
        1,
        0,
        new Date(),
        deck1,
        deck2,
        2000,
        2000,
        false
    );
    
    return room._id.toString();
}

module.exports = { createOfflineBattleSession };