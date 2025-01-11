import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protect.middleware.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

// authenticate user before allowing profile update
router.put("/update-profile",protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth)

export default router;