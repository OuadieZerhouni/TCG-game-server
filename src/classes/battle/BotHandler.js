const GameEngine = require('./GameEngine');

class BotHandler {
  constructor(io) {
    this.io = io;
    this.gameEngine = new GameEngine();
  }

  handleBotTurn(room) {
    const bot = room.player2;

    if (bot.hand.length > 0) {
      const playedCard = this.gameEngine.playCardToField(room, bot.id, bot.hand[0].id);
      if (playedCard) {
        return [{
          turn: room.turn++,
          actionType: "playCard",
          playerId: bot.id,
          initiatorCard: playedCard,
        }];
      }
    } else if (bot.field.length > 0) {
      const [attackerCard, attackedCard] = this.gameEngine.attackCard(room, bot.id, bot.field[0].id);
      const result = [{
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