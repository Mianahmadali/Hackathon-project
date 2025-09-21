/*
 * Entry point: loads env, connects to MongoDB, and starts the HTTP server.
 */
require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start HTTP server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`DonateHub API running on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
    });

    // Graceful shutdown on unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

    // Graceful shutdown on SIGINT/SIGTERM
    const shutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
