import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated.') as any;
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWTsecret as string);
  } catch (err:any) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.') as any;
    error.statusCode = 401;
    throw error;
  }

  req.isAuth = true;
  req.userId = (decodedToken as any).userId;
  next();
};
