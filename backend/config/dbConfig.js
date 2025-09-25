
import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig.js";


export const connectDB = async () => {

    console.log("Connecting to database...");

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database configured successfully");
    }
    catch(error) {
        console.log("Error in database connection...");
        console.log(error);
    }
}