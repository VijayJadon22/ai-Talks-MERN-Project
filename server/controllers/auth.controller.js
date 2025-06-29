import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/auth.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ success: false, message: "User does not exist, Please signup!" });
        }

        //check if password matches the hashedPassword
        const isPasswordMatch = await userExists.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password", });
        }

        //if password matched generateToken and set token in cookie 
        generateTokenAndSetCookie(userExists, res);

        //return successfull response status and message
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: { username: userExists.username, email: userExists.email }
        })

    } catch (error) {
        console.log(`Error in loginUser controller: ${error}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const user = await User.create({ username, email, password });
        generateTokenAndSetCookie(user, res);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { username: user.username, email: user.email }
        });
    } catch (error) {
        console.log(`Error in signupUser controller: ${error}`);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getUser = async (req, res) => {

}