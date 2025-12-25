const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const TOKEN_TTL = '7d';

async function register(req, res, next) {
  try {
    const { fullName, phone, email, password, company, isAgency } = req.body || {};
    if (!fullName || !phone || !email || !password) {
      const err = new Error('Missing required fields');
      err.status = 400;
      throw err;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const err = new Error('User already exists');
      err.status = 409;
      throw err;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      phone,
      email,
      password: hashed,
      company,
      isAgency
    });
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: TOKEN_TTL });
    res.status(201).json({ token, user: user.toSafe() });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.status = 400;
      throw err;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const valid = user && (await bcrypt.compare(password, user.password));
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: TOKEN_TTL });
    res.json({ token, user: user.toSafe() });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };

