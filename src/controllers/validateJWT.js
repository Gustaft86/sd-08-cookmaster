const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const UNAUTHORIZED = 401;
const secret = 'publicSecretParadox';

module.exports = rescue(async (req, res, next) => {
  console.log(req.method, req.path);
  const token = req.headers.authorization;

  if(!token && req.method === 'PUT' && req.path.includes('/recipes')) return res
    .status(UNAUTHORIZED).json({ message: 'missing auth token' });

  if(!token) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findById(decoded.id);
    if(!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({  message: error.message});
  }
});
