import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';  
import { refreshAccessToken,loginUser,signupUser,sendResetOtp,updateUsingOtp,verifyOtp, resendOtp } from '../services/authService.service';



dotenv.config();

interface UserRequestBody {
  email: string;
  name: string;
  password: string;
  refreshTokens:string;
  isAdmin:boolean;
  isVip:boolean;
}

export const signup = async (req: Request<any, any, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.') as any;
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    const isVip = req.body.isVip;

   let results = await signupUser(email,name,password,isAdmin,isVip)

    res.status(201).json({ message: 'User created!', userId: results});
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request<any, any, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
  try {
   
    const email = req.body.email;
    const password = req.body.password;
    let response = await loginUser(email,password)
    res.status(200).json({ token: response.token , userId: response.userId,refreshToken:response.refreshToken });
  } catch (err:any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.body.refreshToken;
    const newToken = await refreshAccessToken(refreshToken);

    res.status(200).json({ message:'your requested new token : ',token: newToken?.token, userId: newToken?.userId });
  } catch (err) {
    next(err)
  }
};

export const sendOTP = async (req:Request,res:Response,next:NextFunction) =>{
  try {
    const email = req.body.email;
    await sendResetOtp(email)
    res.status(200).json({ message: 'Reset password OTP sent successfully.' });
  } catch (err) {
    next(err);
  }
}

export const ResendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const email = req.body.email;
      await resendOtp(email);
      res.status(200).json({ message: 'your new OTP code was sent successfully.' });
  } catch (err) {
      next(err);
  }
};


export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const otp = req.body.otp;
      const userEmail = req.body.email;
      const newPassword = req.body.password;

      await verifyOtp(userEmail, otp);

      res.status(200).json({ message: { isValid:true, note:'succesfully validated the otp'} });
  } catch (error) {
      next(error);
  }
};


export const updatePasswordWithOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const otp = (req.body.otp);
    const userEmail = req.body.email;
    const newPassword = req.body.password;

    await updateUsingOtp(userEmail, otp, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error:any) {
   next(error)
  }
};
