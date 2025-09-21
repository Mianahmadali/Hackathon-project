/*
 * API Error class with HTTP status code and optional details
 */
class ApiError extends Error {
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    if (details) this.details = details;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
