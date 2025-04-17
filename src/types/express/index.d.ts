import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        name: string;
        role: string;
      } & Document;
    }
  }
} 