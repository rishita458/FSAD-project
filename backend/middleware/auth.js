import jwt from 'jsonwebtoken';
import { AppError, asyncHandler } from '../utils/errorHandler.js';

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 */
export const authenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new AppError('No token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token has expired', 401);
    }
    throw new AppError('Invalid token', 401);
  }
});

/**
 * Authorization middleware
 * Checks if user has required roles
 */
export const authorize = (...roles) => {
  return asyncHandler((req, res, next) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        `Access denied. Required role: ${roles.join(' or ')}`,
        403
      );
    }
    next();
  });
};

/**
 * Optional authentication middleware
 * Attaches user to request if token exists, but doesn't fail if missing
 */
export const optionalAuthenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded;
    } catch (error) {
      // Token is invalid, but we don't throw since it's optional
      req.user = null;
    }
  }
  
  next();
});
