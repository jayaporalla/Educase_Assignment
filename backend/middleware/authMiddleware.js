const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Unauthorized';
    return res.status(401).json({ message });
  }
}

module.exports = authMiddleware;

