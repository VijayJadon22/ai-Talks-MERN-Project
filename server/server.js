import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectToDB } from "./config/connectToDB.js";
import authRoutes from "./routes/auth.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname=path.resolve

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // ✅ Your Vite frontend URL
    credentials: true, // ✅ Important for sending cookies
}));

app.use(bodyParser.json());
app.use(cookieParser());



app.use('/api/auth', authRoutes);
app.use("/api/feedback", feedbackRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server started on PORT:`, PORT);
    connectToDB();
})
