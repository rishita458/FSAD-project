import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB, { sequelize } from './config/database.js';
import { initializeUser } from './models/User.js';
import { logger } from './utils/logger.js';
import { errorHandler, asyncHandler } from './utils/errorHandler.js';

// Route imports
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`, { ip: req.ip });
  next();
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to database and sync models
    await connectDB();
    logger.info('Database connected successfully');
    
    // Initialize User model after database connection
    initializeUser(sequelize);
    logger.info('User model initialized');

    // ==================== API HEALTH & INFO ENDPOINTS ====================
    
    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ 
        status: 'Server is running',
        environment: NODE_ENV,
        version: '1.0.0',
        timestamp: new Date().toISOString()
      });
    });

    // API Info/Documentation endpoint
    app.get('/api/info', (req, res) => {
      res.json({
        name: 'Service Connect API',
        version: '1.0.0',
        environment: NODE_ENV,
        endpoints: {
          authentication: {
            login: 'POST /api/auth/login',
            register: 'POST /api/auth/register',
            logout: 'POST /api/auth/logout'
          },
          users: {
            list: 'GET /api/users',
            get: 'GET /api/users/:id',
            create: 'POST /api/users',
            update: 'PUT /api/users/:id',
            delete: 'DELETE /api/users/:id'
          },
          professionals: {
            list: 'GET /api/professionals',
            get: 'GET /api/professionals/:id',
            create: 'POST /api/professionals',
            update: 'PUT /api/professionals/:id',
            delete: 'DELETE /api/professionals/:id'
          },
          bookings: {
            list: 'GET /api/bookings',
            get: 'GET /api/bookings/:id',
            create: 'POST /api/bookings',
            update: 'PUT /api/bookings/:id',
            cancel: 'DELETE /api/bookings/:id'
          },
          categories: {
            list: 'GET /api/categories',
            get: 'GET /api/categories/:id',
            create: 'POST /api/categories',
            update: 'PUT /api/categories/:id',
            delete: 'DELETE /api/categories/:id'
          },
          reviews: {
            list: 'GET /api/reviews',
            get: 'GET /api/reviews/:id',
            create: 'POST /api/reviews',
            update: 'PUT /api/reviews/:id',
            delete: 'DELETE /api/reviews/:id'
          },
          admin: {
            list: 'GET /api/admin',
            get: 'GET /api/admin/:id',
            create: 'POST /api/admin',
            update: 'PUT /api/admin/:id',
            delete: 'DELETE /api/admin/:id'
          }
        }
      });
    });

    // ==================== API ROUTE REGISTRATIONS ====================
    
    // User Management Routes
    app.use('/api/users', userRoutes);
    
    // Professional Routes
    app.use('/api/professionals', professionalRoutes);
    
    // Booking Management Routes
    app.use('/api/bookings', bookingRoutes);
    
    // Category Management Routes
    app.use('/api/categories', categoryRoutes);
    
    // Review Management Routes
    app.use('/api/reviews', reviewRoutes);
    
    // Admin Routes
    app.use('/api/admin', adminRoutes);

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: {
          message: `Route ${req.method} ${req.path} not found`,
          statusCode: 404,
          timestamp: new Date().toISOString()
        }
      });
    });

    // Global error handling middleware (must be last)
    app.use(errorHandler);

    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`, { 
        environment: NODE_ENV,
        url: `http://localhost:${PORT}`
      });
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error('Unhandled Rejection', err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception', err);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
