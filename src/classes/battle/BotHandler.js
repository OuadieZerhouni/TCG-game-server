const GameEngine = require('./GameEngine');

class BotHandler {
  /**
   * @param {object} options
   * @param {object} options.io - The socket.io instance.
   */
  constructor({ io }) {
    this.io = io;
  }

  handleBotTurn(battleSession) {
    const bot = battleSession.player2;

    if (bot.hand.length > 0) {
      const playedCard = GameEngine.playCardToField(battleSession, bot.id, bot.hand[0].id);
      if (playedCard) {
        return [{
          turn: battleSession.turn++,
          actionType: "playCard",
          playerId: bot.id,
          initiatorCard: playedCard,
        }];
      }
    } else if (bot.field.length > 0) {
      const [attackerCard, attackedCard] = GameEngine.attackCard(battleSession, bot.id, bot.field[0].id);
      const result = [{
        turn: battleSession.turn++,
        actionType: "attackCard",
        playerId: bot.id,
        initiatorCard: attackerCard,
        targetCardList: [attackedCard],
      }];
      if (attackedCard.blood == 0) {
        result.push({
          turn: battleSession.turn,
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