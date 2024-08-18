// BotHandler.js

class BotHandler {
  constructor(io) {
    this.io = io;
  }

  handleBotTurn(room) {
    /** @var {Player} bot */
    const bot = room.player2; // Assuming player2 is the bot
    // const drawnCard = bot.drawCard();
    // if (!drawnCard) {
    //   console.error(`Bot could not draw a card`);
    //   return;
    // }

    // this.io.to(room.id).emit("action", {
    //   turn: room.turn++,
    //   actionType: "drawCard",
    //   playerId: bot.id,
    //   initiatorId: drawnCard.id,
    // });

    console.log('-----------');
    console.log(bot);
    // sleep for 2 seconds
    setTimeout(() => {
      if (bot.hand.length > 0) {
        const playedCard = bot.playCardToField(bot.hand[0].id);
        if (playedCard) {
          this.io.to(room.id).emit("action", {  
            turn: room.turn++,
            actionType: "playCard",
            playerId: bot.id,
            initiatorId: playedCard.id,
          });
        }
      }
    }, 2000);



  }
}

module.exports = BotHandler;
