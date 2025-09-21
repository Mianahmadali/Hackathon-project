/*
 * Auth middleware: authenticate requests with JWT and restrict by role
 */
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');

exports.authenticate = (req, res, next) => {
  try {
    let token;

    // Prefer Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError('Not authorized', StatusCodes.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch (err) {
    next(new ApiError('Not authorized', StatusCodes.UNAUTHORIZED));
  }
};

exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError('Forbidden', StatusCodes.FORBIDDEN));
  }
  next();
};
