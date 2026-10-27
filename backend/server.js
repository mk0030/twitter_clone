import express from "express";
import authRoutes from "./routes/authroutes.js"
import userRoutes from "./routes/userroutes.js";
import dotenv from "dotenv";
import connectMongoDB from "./bd/connectMongoDB.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON req.body
app.use(express.urlencoded({extended: true})); // Middleware to parse form data URL-encoded 

app.use(cookieParser()); // Middleware to parse cookies from the request headers

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})