import User from "../models/user.js";
import mongoose from "mongoose";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users.length) return res.status(404).json({ message: "No users found" });
      res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get all users except logged in user
export const getAllUsersExceptLoggedIn = async (req, res, next) => {
  try {
    const { loggedInUserId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }
    const users = await User.find({ _id: { $ne: loggedInUserId } });       
    if (!users.length) return res.status(404).json({ message: "No other users found" });    
    res.status(200).json(users);
  } catch (error) {
	  next(error);
  }
};

// Get all mentors
export const getAllMentors = async (req, res, next) => {
  try {
    const mentors = await User.find({ isMentor: true });
    res.status(200).json(mentors);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
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
};