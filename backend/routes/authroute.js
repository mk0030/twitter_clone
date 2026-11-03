import express from "express";
import { getCurrentUser } from "../controllers/authcontroller.js";
import { signup } from "../controllers/authcontroller.js";
import { login } from "../controllers/authcontroller.js";
import { logout } from "../controllers/authcontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/currentuser", protectRoute , getCurrentUser)

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;