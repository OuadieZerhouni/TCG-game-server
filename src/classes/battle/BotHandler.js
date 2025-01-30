// BotHandler.js

class BotHandler {
  constructor(io) {
    this.io = io;
  }

  handleBotTurn(room) {
    /** @var {Player} bot */
    const bot = room.player2; // Assuming player2 is the bot

    if (bot.hand.length > 0) {
      const playedCard = bot.playCardToField(bot.hand[0].id);
      if (playedCard) {
        return {
          turn: room.turn++,
          actionType: "playCard",
          playerId: bot.id,
          initiatorCard: playedCard,
        };
      }
    }
    else if (bot.field.length > 0) {
      const [attackerCard, attackedCard] = room.attackCard(bot.id, bot.field[0].id);
      return {
        turn: room.turn++,
        actionType: "attackCard",
        playerId: bot.id,
        initiatorCard: attackerCard,
        targetCardList: [attackedCard],
      };
    }



  }
}

module.exports = BotHandler;
