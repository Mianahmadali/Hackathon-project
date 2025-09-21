/*
 * Validation middleware that returns 400 with validation errors
 */
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError('Validation error', StatusCodes.BAD_REQUEST, errors.array()));
  }
  next();
};
