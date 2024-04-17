class Player {
  constructor(id, deck, blood) {
    this.id = id;
    this.deck = deck;
    this.hand = [];
    this.field = [];
    this.blood = blood;
  }

  drawCard() {
    if (this.deck.length > 0) {
      const card = this.deck.shift();
      this.hand.push(card);
      return card;
    }
    return null;
  }

  playCard(cardIndex) {
    if (cardIndex < this.hand.length) {
      const card = this.hand.splice(cardIndex, 1)[0];
      this.field.push(card);
      return card;
    }
    return null;
  }
}

module.exports = Player;
