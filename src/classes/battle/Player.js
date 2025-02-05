 

class Player {
  /**
   * 
   * @param {string} id
   * @param {Deck} deck
   * @param {number} blood
   */
  constructor(id, deck, blood) {
    this.id        = id;
    /** @type {Deck} */
    this.deck      = deck;
    /** @type {Card[]} */
    this.hand      = [];
    /** @type {Card[]} */
    this.field     = [];
    this.graveyard = [];
    this.blood     = blood;
  }

  /**
   * Plays a card from hand to field.
   * @param {number} cardIndex - Index of the card in hand.
   * @returns {Card|null} - The played card or null if invalid index.
   */
  playCard(cardIndex) {
    if (cardIndex < 0 || cardIndex >= this.hand.length) {
      console.error(`Invalid card index: ${cardIndex}`);
      return null;
    }
    const card = this.hand.splice(cardIndex, 1)[0];
    this.field.push(card);
    return card;
  }

  /**
   * 
   * @param {*} attackValue 
   * @param {*} attackedCardIndexOnField 
   * @returns Card
   */
  takeAttack(attackValue, attackedCardIndexOnField) {
    const attackedCard = this.field[attackedCardIndexOnField];
    if (!attackedCard) {
      console.error(`Invalid attacked card index: ${attackedCardIndexOnField}`);
      return null;
    }
    attackedCard.blood -= attackValue;
    if (attackedCard.blood <= 0) {
      attackedCard.blood = 0;
      this.graveyard.push(attackedCard);
      this.field.splice(attackedCardIndexOnField, 1);
    }
    return attackedCard;
  }

  getCardIndexOnField(cardId) {
    return this.field.findIndex((card) => card.id === cardId
    );
  }

  /**
   * Reduces the player's blood by a given amount.
   * @param {number} amount - The damage amount.
   */
  takeDamage(amount) {
    if (amount < 0) {
      console.error(`Invalid damage amount: ${amount}`);
      return;
    }
    this.blood -= amount;
  }

  /**
   * Checks if the player is dead.
   * @returns {boolean} - True if blood is 0 or less.
   */
  isDead() {
    return this.blood <= 0;
  }

  /**
   * Serializes the player object to JSON.
   * @returns {Object} - Serialized player.
   */
  serialize() {
    return {
      id: this.id,
      deck: this.deck,
      hand: this.hand,
      field: this.field,
      blood: this.blood,
    };
  }

  /**
   * Plays a specific card to the field by card ID.
   * @param {string} cardId - ID of the card to be played.
   * @returns {Card|null} - The played card or null if not found.
   */
  playCardToField(cardId) {
    const cardIndex = this.hand.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      console.error(`Card with id ${cardId} not found in player's ${this.id} hand`);
      return null;
    }
    const card = this.hand.splice(cardIndex, 1)[0];
    this.field.push(card);
    return card;
  }

  isLost() {
    return !this.deck.cards.length && !this.hand.length && !this.field.length;
  }

  /**
   * Draws a card from the deck to the hand.
   * @returns {Card|null} - The drawn card or null if deck is empty.
   */
  drawCard() {
    if (this.deck.cards.length === 0) {
      console.error(`Player ${this.id} tried to draw a card from an empty deck`);
      return null;
    }
    const card = this.deck.cards.shift();
    this.hand.push(card);
    return card;
  }
}

module.exports = Player;
