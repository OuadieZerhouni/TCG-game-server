const mongoose = require('mongoose');

/**
 * Represents an equipment in the game.
 *
 * @class Equipment
 */
const equipmentSchema = new mongoose.Schema({
  /**
   * The type of equipment (e.g., "Weapon," "Armor").
   *
   * @property {string} type
   * @required
   */
  type: {
    type: String,
    required: true,
  },

  /**
   * The name of the JavaScript function associated with this equipment.
   *
   * @property {string} functionName
   * @required
   */
  functionName: {
    type: String,
    required: true,
  },

  /**
   * An array of card types that this equipment can be used with.
   *
   * @property {string[]} cardTypes
   */
  cardTypes: {
    type: [String],
  },

  /**
   * The name of the equipment.
   *
   * @property {string} name
   * @required
   */
  name: {
    type: String,
    required: true,
  },
});

/**
 * The Equipment model.
 *
 * @typedef {Model<Equipment>} EquipmentModel
 */
const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
