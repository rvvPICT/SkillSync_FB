import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const signupController = async (req, res) => {
    try {
        console.log("Signup request received:", req.body);

        const { username, email, password } = req.body;

        // Check if user exists (by email or username)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token, user: newUser });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error in signup", error: error.message });
    }
};

export const loginController = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

        if (!user) return res.status(400).json({ message: "User not found. Please sign up" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password! Please try again." });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error in login", error: error.message });
    }
};
