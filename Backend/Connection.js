import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export default async function Connection(){
    const db  = await mongoose.connect('mongodb://127.0.0.1:27017/Online-Counseling-platform');
    console.log("DB connected");
    return db;
}