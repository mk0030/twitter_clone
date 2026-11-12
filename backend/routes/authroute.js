import express from "express";
import { getCurrentUser } from "../controllers/authcontroller.js";
import { signup } from "../controllers/authcontroller.js";
import { login } from "../controllers/authcontroller.js";
import { logout } from "../controllers/authcontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/currentuser", protectRoute , getCurrentUser) 
/*La requête passe d’abord par protectRoute. 
Si tout est bon, next() appelle getCurrentUser, qui trouve req.user déjà rempli. 
*/

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;