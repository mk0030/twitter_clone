import express from "express";
import authRoutes from "./routes/authroutes.js"
import dotenv from "dotenv";
import connectMongoDB from "./bd/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;



app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})