import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, "Password must be atleast 6 characters long"],
        required: [true, "Password is required"]
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;