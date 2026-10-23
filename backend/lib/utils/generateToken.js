import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});
    
    res.cookie("jwt", token, {
        httpOnly: true, //prevents XSS attacks by restricting access to the cookie from client-side scripts
        secure: process.env.NODE_ENV !== "development", // Set to true in production
        sameSite: "strict", // Helps prevent CSRF attacks by ensuring the cookie is only sent in requests originating from the same site
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days in milliseconds
    });
}