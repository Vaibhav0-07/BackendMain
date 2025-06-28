import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";  
dotenv.config({
    path: ".env",
});

// Function to connect to the database

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Database connected successfully via Database folders connection");
        console.log(`Database name: ${connectionInstance.connection.name}`); // will print the name of the database
        console.log(`Database port: ${connectionInstance.connection.port}`); // will print the port of the database
        console.log(`Database user: ${connectionInstance.connection.user}`); // will print the user of the database
        // Note: connectionInstance.connection.host will print the host of the database
        console.log(`Database host: ${connectionInstance.connection.host}`); // will print the host of the database
    }
    catch(error){
        console.error("Failed to connect to the database via Database folders connection", error);
        process.exit(1); // Exit the process with failure
    }
}

// Export the connectDB function
export default connectDB;