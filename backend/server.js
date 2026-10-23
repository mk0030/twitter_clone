import express from "express";
import authRoutes from "./routes/authroutes.js"
import dotenv from "dotenv";
import connectMongoDB from "./bd/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON req.body
app.use(express.urlencoded({extended: true})); // Middleware to parse form data URL-encoded 


app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})