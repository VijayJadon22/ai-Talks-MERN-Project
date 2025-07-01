import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDB } from "./config/connectToDB.js";
import authRoutes from "./routes/auth.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Recreate __dirname (only needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple CORS configuration
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});

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