/*
 * Authentication controller: register, login, me, logout
 */
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const signToken = (userId, role) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ sub: userId, role }, secret, { expiresIn });
};

const setTokenCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  const secure = (process.env.COOKIE_SECURE === 'true') || isProd;
  res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role && !['ngo', 'donor'].includes(role)) {
    throw new ApiError('Invalid role', StatusCodes.BAD_REQUEST);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError('Email already registered', StatusCodes.CONFLICT);
  }

  const user = await User.create({ name, email, password, role: role || 'donor' });

  const token = signToken(user._id.toString(), user.role);
  setTokenCookie(res, token);

  res.status(StatusCodes.CREATED).json({
    message: 'Registration successful',
    token,
    user,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new ApiError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const token = signToken(user._id.toString(), user.role);
  setTokenCookie(res, token);

  res.status(StatusCodes.OK).json({
    message: 'Login successful',
    token,
    user: user.toJSON(),
  });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json({ user });
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(StatusCodes.OK).json({ message: 'Logged out' });
});
