import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiration: number;
}

const otpStorageSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiration: { type: Number, required: true },
});

export default mongoose.model<IOTP>('OTP', otpStorageSchema);
