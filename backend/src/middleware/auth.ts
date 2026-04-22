import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

interface AuthenticatedRequest extends express.Request {
  user?: any;
}

export const protect = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({
        error: {
          message: 'Not authorized, token failed',
          status: 401
        }
      });
    }
  }

  if (!token) {
    res.status(401).json({
      error: {
        message: 'Not authorized, no token',
        status: 401
      }
    });
  }
};

export const admin = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      error: {
        message: 'Not authorized as an admin',
        status: 403
      }
    });
  }
};

export const partner = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user && (req.user.role === 'partner' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      error: {
        message: 'Not authorized as a partner',
        status: 403
      }
    });
  }
};

export const supplier = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user && (req.user.role === 'supplier' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      error: {
        message: 'Not authorized as a supplier',
        status: 403
      }
    });
  }
};
