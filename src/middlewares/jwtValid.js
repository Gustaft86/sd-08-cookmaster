const jwt = require('jsonwebtoken');

const UserModel = require('../models/users');

const secret = 'secretdetoken';
const BAD_REQUEST = 401;

const jwtValid = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(decoded.data.email);

    if (!user) {
      return res
        .status(BAD_REQUEST)
        .json({ message: 'User not found by this token' });
    }

    req.user = user;

    next();

  } catch (error) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'jwt malformed' });
  }
};

module.exports = jwtValid;
