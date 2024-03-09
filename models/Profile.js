/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



// const mongoose = require('mongoose');

// /**
//  * Represents a user's profile in the game.
//  *
//  * @class Profile
//  */
// const profileSchema = new mongoose.Schema({

//   /**
//    * The user ID associated with this profile.
//    *
//    * @property {string} userId
//    * @required
//    */
//   userId: {
//     type: String,
//     required: true,
//   },

//   /**
//    * The deck associated with the profile.
//    *
//    * @property {Deck} deck
//    */
//   deck: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Deck',
//   },

//   /**
//    * The kingdom ID associated with the profile (nullable).
//    *
//    * @property {string|null} kingdomId
//    */
//   kingdomId: {
//     type: String,
//     default: null,
//   },

//   /**
//    * The rank of the user's profile.
//    *
//    * @property {string} rank
//    */
//   rank: {
//     type: Number,
//   },

//   /**
//    * A quote associated with the profile.
//    *
//    * @property {string} quote
//    */
//   quote: {
//     type: String,
//   },

//   /**
//    * The amount of in-game diamonds held by the user.
//    *
//    * @property {number} diamondAmount
//    */
//   diamondAmount: {
//     type: Number,
//   },

//   /**
//    * The amount of in-game gold held by the user.
//    *
//    * @property {number} goldAmount
//    */
//   goldAmount: {
//     type: Number,
//   },

//   /**
//    * An array of equipment IDs associated with the profile.
//    *
//    * @property {Equipment[]} equipments
//    */
//   equipments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Equipment',
//     },
//   ],
// });

// /**
//  * The Profile model.
//  *
//  * @typedef {Model<Profile>} ProfileModel
//  */
// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;
