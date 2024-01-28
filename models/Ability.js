/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */

/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:21:47 */

const mongoose = require('mongoose');

/**
 * Represents an ability in the game.
 *
 * @class Ability
 */
const abilitySchema = new mongoose.Schema({
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
