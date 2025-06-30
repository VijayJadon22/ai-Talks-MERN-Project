import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateAIFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/",authMiddleware, generateAIFeedback);
// router.get("/history",authMiddleware, generateAIFeedback);


export default router;