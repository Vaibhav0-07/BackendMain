import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "process.env.CORS_ORIGIN", // Replace with your actual CORS origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
})); // Enable CORS for all routes

app.use(express.json({limit:'16kb'})); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the "public" folder   
app.use(cookieParser()); // Parse cookies


//importing routes
import userRouter from "./routes/user.routes.js";


//declaration of routes
app.use("/api/v1/users", userRouter);


export {app};