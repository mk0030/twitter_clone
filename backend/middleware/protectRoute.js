import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

/*C’est la deuxième moitié de l’authentification : generateToken.js donne le badge à l’utilisateur, 
protectRoute.js le vérifie à chaque requête sur une route protégée. 
C’est un middleware, comme ceux vus dans server.js. */

export const protectRoute = async (req, res, next) => { // Middleware to protect routes and ensure the user is authenticated, next pour pour passer à la prochaine fonction middleware ou route handler
    try {
        const token = req.cookies.jwt; // Get the token from the cookies 
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        
        if(!decoded){
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password"); // Find the user by ID from the decoded token and we are excluding the password field from the user object for security reasons
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - User not found" });
        }
        req.user = user; 
        next(); 
        /*Tu attaches l’utilisateur à la requête. 
        Les fonctions suivantes (tes contrôleurs) pourront écrire req.user._id pour savoir qui 
        fait l’action, sans refaire la vérification. C’est ce qui permet, par exemple, 
        de savoir qui like un post ou qui crée un tweet. Puis next() passe la main. 
        */
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}