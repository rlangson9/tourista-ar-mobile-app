import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export interface AuthenticatedRequest extends express.Request {
  user?: {
    id: string;
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'partner' | 'supplier' | 'admin';
    isVerified: boolean;
  };
}

export const protect = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      req.user = await User.findById(decoded.id).select('-password') as any;
      return next();
    } catch {
      return res.status(401).json({
        error: { message: 'Not authorized, token failed', status: 401 }
      });
    }
  }

  return res.status(401).json({
    error: { message: 'Not authorized, no token', status: 401 }
  });
};

export const admin = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ error: { message: 'Not authorized as an admin', status: 403 } });
};

export const partner = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user?.role === 'partner' || req.user?.role === 'admin') return next();
  return res.status(403).json({ error: { message: 'Not authorized as a partner', status: 403 } });
};

export const supplier = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (req.user?.role === 'supplier' || req.user?.role === 'admin') return next();
  return res.status(403).json({ error: { message: 'Not authorized as a supplier', status: 403 } });
};