const mongoose = require('mongoose');

/**
 * Represents an ability in the game.
 *
 * @class Ability
 */
const abilitySchema = new mongoose.Schema({
  /**
   * The unique identifier for the ability.
   *
   * @property {string} id
   * @required
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The name of the JavaScript function associated with this ability.
   *
   * @property {string} functionName
   * @required
   */
  functionName: {
    type: String,
    required: true,
  },

  /**
   * The power of the ability, which determines its effectiveness.
   *
   * @property {number} power
   * @required
   */
  power: {
    type: Number,
    required: true,
  },
});

/**
 * The Ability model.
 *
 * @typedef {Model<Ability>} AbilityModel
 */
const Ability = mongoose.model('Ability', abilitySchema);

module.exports = Ability;
