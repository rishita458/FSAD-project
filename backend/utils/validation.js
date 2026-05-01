/**
 * Input validation middleware
 * Provides basic validation for common fields
 */

import { AppError } from './errorHandler.js';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 characters, at least one number and one letter
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Middleware to validate request body fields
 */
export const validateRequest = (requiredFields = []) => {
  return (req, res, next) => {
    const errors = [];

    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].trim() === '') {
        errors.push(`${field} is required`);
      }
    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '), 400);
    }

    next();
  };
};

/**
 * Validate email field
 */
export const validateEmailField = (req, res, next) => {
  if (req.body.email && !validateEmail(req.body.email)) {
    throw new AppError('Invalid email format', 400);
  }
  next();
};

/**
 * Validate password field
 */
export const validatePasswordField = (req, res, next) => {
  if (req.body.password && !validatePassword(req.body.password)) {
    throw new AppError(
      'Password must be at least 8 characters with letters and numbers',
      400
    );
  }
  next();
};
