// import express from "express";
// import mongoose from "mongoose";
// import User from "../models/user.js";

// const router = express.Router();

// router.get("/all", async (req, res) => {
//   try {
//       const users = await User.find();
//       if (!users.length) {
//           return res.status(404).json({ message: "No users found" });
//       }
//       res.status(200).json(users);
//   } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// router.get("/mentors", async (req, res) => {
//   try {
//       const mentors = await User.find({ isMentor: true });
//       res.status(200).json(mentors);
//   } catch (error) {
//       console.error("Error fetching mentors:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// router.get("/:userId", async (req, res) => {
//   try {
//       const { userId } = req.params;

//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//           return res.status(400).json({ message: "Invalid user ID format" });
//       }

//       const user = await User.findById(userId);

//       if (!user) {
//           return res.status(404).json({ message: "User Not Found" });
//       }

//       res.status(200).json(user);
//   } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// router.get("/user/:userId/projects", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     const user = await User.findById(userId).select("myProjects");

//     if (!user) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     res.status(200).json(user.myProjects); // Fix: Send only the `myProjects` array
//   } catch (error) {
//     console.error("Error fetching user projects:", error); // Logs full error details
//     res.status(500).json({ message: "Error fetching user projects", error: error.message });
//   }
// });


// router.get("/mentor/:userId", async (req, res) => {
// 	try {
// 			const { userId } = req.params;

// 			if (!mongoose.Types.ObjectId.isValid(userId)) {
// 					return res.status(400).json({ message: "Invalid user ID format" });
// 			}

// 			const mentor = await User.findOne({ _id: userId, isMentor: true });

// 			if (!mentor) {
// 					return res.status(404).json({ message: "Mentor Not Found" });
// 			}

// 			res.status(200).json(mentor);
// 	} catch (error) {
// 			console.error("Error fetching user:", error);
// 			res.status(500).json({ message: "Server error", error: error.message });
// 	}
// });

// router.put("/update-avatar/:userId", async (req, res) => {
//   try {
//     console.log("Received update-avatar request:", req.params, req.body);

//     const { userId } = req.params;
//     const { avatar } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     }

//     if (avatar === undefined) {
//       return res.status(400).json({ error: "Avatar index is missing in the request body" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ message: "Avatar updated successfully!", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating avatar:", error);
//     res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// });
// export default router;


import express from "express";
import { signup, login } from "../controller/authController.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/signup", signup);
router.post("/login", login);

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

// Update user avatar (Protected)
router.put("/update-avatar/:userId", authenticateUser, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { avatar } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (avatar === undefined) {
            return res.status(400).json({ error: "Avatar index is missing" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "Avatar updated successfully!", user: updatedUser });
    } catch (error) {
        next(error);
    }
});

// Use error handler middleware
router.use(errorHandler);

export default router;
