class Player {
  /**
   * 
   * @param {string} id
   * @param {Deck} deck
   * @param {number} blood
   */
  constructor(id, deck, blood) {
    this.id = id;
    this.deck = deck;
    this.hand = [];
    this.field = [];
    this.blood = blood;
  }

  playCard(cardIndex) {
    if (cardIndex < this.hand.length) {
      const card = this.hand.splice(cardIndex, 1)[0];
      this.field.push(card);
      return card;
    }
    return null;
  }

  takeDamage(amount) {
    this.blood -= amount;
  }

  isDead() {
    return this.blood <= 0;
  }

  serialize() {
    return {
      id: this.id,
      deck: this.deck,
      hand: this.hand,
      field: this.field,
      blood: this.blood,
    };
  }

  playCardToField(cardId) {
    const cardIndex = this.hand.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      const card = this.hand.splice(cardIndex, 1)[0];
      this.field.push(card);
      console.log(`Player ${this.id} played card ${cardId} to the field ${this.field} deck ${this.deck}`);
      return card;
    }
    console.error(`Card with id ${cardId} not found in player's ${this.id} hand`);
    return null;
  }

  drawCard() {
    if (this.deck.cards.length > 0) {
      const card = this.deck.cards.shift();
      this.hand.push(card);
      console.log(`Player ${this.id} drew card ${card.id}`);
      return card;
    }
    console.error(`Player ${this.id} tried to draw a card from an empty deck`);
    return null;
  }
}

module.exports = Player;
