import express from "express";
import authRoutes from "./routes/authroute.js"
import userRoutes from "./routes/userroute.js";
import postRoutes from "./routes/postroute.js";
import notificationRoutes from "./routes/notificationroute.js";
import dotenv from "dotenv";
import connectMongoDB from "./bd/connectMongoDB.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import path from "path";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({limit: "5mb"})); // Middleware to parse JSON req.body
app.use(express.urlencoded({extended: true})); // Middleware to parse form data URL-encoded 

app.use(cookieParser()); // Middleware to parse cookies from the request headers

app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend/front-twiter-clone/dist")));

	app.get("{*splat}", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "front-twiter-clone", "dist", "index.html"));
	});
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})