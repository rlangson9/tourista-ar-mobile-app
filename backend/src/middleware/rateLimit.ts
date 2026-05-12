import rateLimit from 'express-rate-limit';

// Rate limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    error: {
      message: 'Too many login attempts. Please try again after 15 minutes.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true // Don't count successful logins
});

// Rate limiter for registration
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 registrations per hour per IP
  message: {
    success: false,
    error: {
      message: 'Too many registration attempts. Please try again later.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for general API requests
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    success: false,
    error: {
      message: 'Too many requests. Please slow down.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for password reset
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 password reset attempts per hour
  message: {
    success: false,
    error: {
      message: 'Too many password reset attempts. Please try again later.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for message sending
export const messageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 messages per minute
  message: {
    success: false,
    error: {
      message: 'Too many messages. Please slow down.',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});