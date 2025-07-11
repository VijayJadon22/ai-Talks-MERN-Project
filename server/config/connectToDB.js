import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectToDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to DB: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }
}