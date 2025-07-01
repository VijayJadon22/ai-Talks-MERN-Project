import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Needed for __dirname in ESM

import { connectToDB } from "./config/connectToDB.js";
import authRoutes from "./routes/auth.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Recreate __dirname (only needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Only fallback to index.html for non-API routes
    app.get("*", (req, res, next) => {
        if (req.originalUrl.startsWith("/api")) {
            return next(); // skip and allow 404 or other handling
        }

        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
}


// Server start
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
    connectToDB();
});
