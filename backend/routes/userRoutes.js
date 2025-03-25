import express from "express";
import { signupController, loginController } from "../controller/authController.js";
import { editProfController } from "../controller/editProfileController.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signupController);
router.post("/login", loginController);
router.put("/edit-profile/:userId", editProfController);

// Get all users (Protected)
router.get("/all", authenticateUser, async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users.length) return res.status(404).json({ message: "No users found" });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

// Get mentors (Protected)
router.get("/mentors", authenticateUser, async (req, res, next) => {
    try {
        const mentors = await User.find({ isMentor: true });
        res.status(200).json(mentors);
    } catch (error) {
        next(error);
    }
});

// Get user by ID (Protected)
router.get("/:userId", authenticateUser, async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// Use error handler middleware
router.use(errorHandler);

export default router;
