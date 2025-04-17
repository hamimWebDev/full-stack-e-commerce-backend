import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { UnauthorizedError } from '../utils/errorHandler';
import { Document } from 'mongoose';

interface JwtPayload {
  id: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
    name: string;
    role: string;
  } & Document;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Not authorized to access this route');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    req.user = user as AuthRequest['user'];
    next();
  } catch (error) {
    next(error);
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