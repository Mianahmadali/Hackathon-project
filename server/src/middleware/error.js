/*
 * Centralized error handler
 */
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || getReasonPhrase(statusCode);

  const payload = {
    success: false,
    message,
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};
