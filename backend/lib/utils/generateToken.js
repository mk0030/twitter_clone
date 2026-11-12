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

/*Un JSON Web Token est une chaîne de caractères qui sert de « badge d’identité ». 
Après la connexion, le serveur donne ce badge au navigateur, qui le renvoie à chaque requête. 
Le serveur peut ainsi savoir qui fait la requête sans redemander le mot de passe.
*/