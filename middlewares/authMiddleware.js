/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET  = process.env.JWT_SECRET;

/**
 * Middleware to check if a user is authenticated with a valid JWT token.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
const checkJwt = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = { checkJwt };
