import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

function connectDB(){
    mongoose.connect(MONGODB_URL)
    .then(() =>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log("Database Connection Error",err);
        process.exit(1);
    })
}

export default connectDB;