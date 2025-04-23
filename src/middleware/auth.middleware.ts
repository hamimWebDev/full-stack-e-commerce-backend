import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { UnauthorizedError } from '../utils/errorHandler';
import { Document, Types } from 'mongoose';

type AuthUser = Document<Types.ObjectId, {}, IUser> & 
  IUser & 
  Required<{ _id: Types.ObjectId }> & 
  { __v: number };

interface AuthRequest extends Omit<Request, 'user'> {
  user?: AuthUser;
}

// Declare module augmentation for Express Request
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

// Rename auth to protect for consistency
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from cookie
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    // Find user and add to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user as AuthUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    next();
  };
}; 