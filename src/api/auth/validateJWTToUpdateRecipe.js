const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

const secret = 'issoesegredo';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  // if (!token) {
  //   return res.status(UNAUTHORIZED).json({ error: 'jwt malformed' });
  // }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByEmail(decoded.data.email);

    if (user) {
      const { password, ...authenticatedUser } = user;
      req.user = authenticatedUser;
    }

    next();
  } catch (err) {
    if (err.message === 'jwt must be provided') {
      return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    return res.status(UNAUTHORIZED).json({ message: err.message });
  }
};
