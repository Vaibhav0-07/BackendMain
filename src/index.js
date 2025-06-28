import dotenv from "dotenv";
import {DB_NAME} from "./constants.js";
import mongoose, { connect } from "mongoose";
dotenv.config({
    path: ".env",
});


/*  * This file is the entry point of the application.
    * It connects to the database and starts the server.
    * The connection to the database is done using mongoose.
    * The connection string is stored in the .env file.
    * The MONGODB_URI constant is used to specify the MongoDB URI.
    * The DB_NAME constant is used to specify the name of the database.
 */


/*
// Approach 1 for db connection
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to the database successfully");
    }
    catch(error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit the process with failure
    }
})();
*/


// Approach 2 for db connection will be in database folder of src folder
import connectDB from "./database/index.js";
// Call the connectDB function to connect to the database
connectDB();