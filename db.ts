import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongooseConnect = async (): Promise<void> => {
    const url: string | undefined = process.env.MONGODB_URL;

    try {
        if (!url) {
            throw new Error("MongoDB URL is not defined in the environment variables.");
        }

        const client = await mongoose.connect(url);
        console.log("Connected to db!");
    } catch (error) {
        console.error(error);
    }
};

export default mongooseConnect;
