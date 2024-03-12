import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator' 
import OTP from '../Schemas/otp';

 export const generateOTP = (): string => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  };

 export const sendEmail = async (email: string, otp: string): Promise<void> => {

    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'etarou@ndu.edu.lb',
        pass: '5y2T$4AA',
      },
    });
  
    const mailOptions = {
      from: 'etarou@ndu.edu.lb',
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  
  
    export const sendResetPasswordOTP = async (email: string): Promise<void> => {
    const otp = generateOTP();
    const expiration = Date.now() + 15 * 60 * 1000; //exp 15 minutes
    await sendEmail(email, otp);
    await OTP.create({ email, otp, expiration });
   
  };


  

