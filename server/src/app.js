/*
 * Express application setup: security, parsers, routes, and error handling.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const ApiError = require('./utils/ApiError');
const errorHandler = require('./middleware/error');

// Routes
const authRoutes = require('./routes/auth.routes');

const app = express();

// Trust proxy for rate limiting when behind reverse proxies (Render/Railway)
app.set('trust proxy', 1);

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || '*';
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients or same-origin (no origin header)
    if (!origin || corsOrigin === '*' || origin === corsOrigin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Security headers
app.use(helmet());

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS
app.use(hpp()); // Prevent HTTP param pollution

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting (apply to API only)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// API routes
app.use('/api/auth', authRoutes);

// 404 handler
app.all('*', (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
