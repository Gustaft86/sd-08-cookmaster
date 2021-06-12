const jwt = require('jsonwebtoken');
const user = require('../models/user');

const secret = 'foguetenaotemre';
const UNAUTHORIZED = 401;

const validateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(UNAUTHORIZED).json({ error: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    const userData = await user.findEmail(decoded.data);
    
    if (!userData) return res.status(UNAUTHORIZED).json({ 'message': 'jwt malformed' });
    
    req.userId = userData._id;

  } catch (err) {
    return res.status(UNAUTHORIZED).json({ 'message': 'jwt malformed' });
  }
  next();
};

module.exports = validateToken;
