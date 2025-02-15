/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:08 */

const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET  = process.env.JWT_SECRET;
/**
 * 
 * @param {String} token
 * @returns {String} user id
 */
function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.user._id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

module.exports = {decodeToken};