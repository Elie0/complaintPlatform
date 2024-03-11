import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../Schemas/user';
import OTP from '../Schemas/otp';
import invalidRefreshToken from '../errors/userError';
import  * as mailauth from '../functions/email' 

interface RefreshTokenResponse {
  token: string;
  userId: string;
 
}

interface LoginResponse {
    token: string;
    userId: string
    refreshToken:string
  }


  export const signupUser = async (email: string, name: string, password: string,isAdmin:boolean,isVip:boolean): Promise<string> => {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
      isAdmin:isAdmin,
      isVip:isVip
    });
  
    const result = await user.save();
  
    return result._id;
  };


  export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const user = await User.findOne({ email: email }) as IUser;
  
    if (!user) {
      throw new Error('Wrong password or email!');
    }
  
    const isEqual = await bcrypt.compare(password, user.password);
  
    if (!isEqual) {
      throw new Error('Wrong password or email!');
    }
  
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWTsecret as string,
      { expiresIn: '1h' }
    );
  
    const refreshToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.RefreshTokenSecret as string,
      { expiresIn: '8h' }
    );
    console.log(refreshToken)
  
    user.refreshTokens.push(refreshToken);
    await user.save();
  
    return { token, userId: user._id.toString(),refreshToken:refreshToken};
  };



export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse | null> => {
  const user = await User.findOne({ 'refreshTokens': refreshToken });

  if (!user) {
    throw new invalidRefreshToken()
  }
    const decodedToken = jwt.verify(refreshToken, process.env.RefreshTokenSecret as string) as { userId: string };
    const newAccessToken = jwt.sign(
      { email: user.email, userId: decodedToken.userId },
      process.env.JWTsecret as string,
      { expiresIn: '1h' }
    );

    return { token: newAccessToken, userId: decodedToken.userId };
 
};

export const sendResetOtp = async(email:string)  =>{

    const user = await User.findOne({email:email}) as IUser;
    if(user)
    {
      await mailauth.sendResetPasswordOTP(email);
    }
    else{
      throw new Error('user not found')
    }

  }

  export const updateUsingOtp = async (email: string, otp: string, password: string): Promise<void> => {
      const user = await User.findOne({ email: email }) as IUser;
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const otpDetails = await OTP.findOneAndDelete({ email: email, otp: otp });
  
      if (!otpDetails || Date.now() > otpDetails.expiration) {
        throw new Error('Invalid or expired OTP');
      }
    
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      await user.save();
      console.log('Password updated successfully');
   
  };
  
  
  export const verifyOtp = async (email: string, otp: number): Promise<{ otp: string, expiration: number }> => {
  
      const user = await User.findOne({ email: email }) as IUser;
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const otpDetails = await OTP.findOne({ email: email, otp: otp });
  
      if (!otpDetails || Date.now() > otpDetails.expiration) {
        throw new Error('Invalid or expired OTP');
      }
      console.log('OTP verified successfully');
      return otpDetails;
   
  };

export const resendOtp = async (email: string): Promise<void> => {
     await sendResetOtp(email)
  };



