import {Response, NextFunction } from 'express';
import User, { IUser } from '../Schemas/user'; 


export const isAdmin = async (req:any, res: Response, next: NextFunction): Promise<void> => {
  try {
  
    const user = await User.findById(req.userId) as IUser;
   
    if (!user.isAdmin) {
      const error = new Error('Not authorized.') as any;
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};
