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
        var result = [{
          turn: room.turn++,
          actionType: "playCard",
          playerId: bot.id,
          initiatorCard: playedCard,
        }];
        return result;
      }
    }
    else if (bot.field.length > 0) {
      const [attackerCard, attackedCard] = room.attackCard(bot.id, bot.field[0].id);
      var result = [{
        turn: room.turn++,
        actionType: "attackCard",
        playerId: bot.id,
        initiatorCard: attackerCard,
        targetCardList: [attackedCard],
      }];
      if (attackedCard.blood == 0) {
        result.push({
          turn: room.turn,
          actionType: "killCard",
          playerId: bot.id,
          targetCardList: [attackedCard],
        });
      }
      return result;

    }
    return [];

  }
}

module.exports = BotHandler;
