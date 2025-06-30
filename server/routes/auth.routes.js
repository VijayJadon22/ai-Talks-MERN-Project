import express from "express";
import { getUser, loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.get("/", authMiddleware, getUser);

export default router;