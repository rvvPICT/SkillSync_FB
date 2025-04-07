import mongoose from "mongoose";
import Project from "../models/project.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const addProjectController = async (req, res) => {
    try {
        console.log("Add Project request received:", req.body);
        const { userId } = req.params;
        // const { userId: bodyUserId } = req.body;  // Destructure userId from body

        // const finalUserId = userId || bodyUserId;
        console.log("Received userId in backend:", userId);
        const { 
            title,
            description,
            domain,
            requiredSkills,
            isPublic,
            teamSize,
            deadline,
            // userId,
        } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required to create a project." });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create user
        const newProject = new Project({
            title,
            description,
            domain,
            requiredSkills,
            isPublic,
            teamSize,
            deadline,
            owner: userId,
            members: [userId],
        });

        await newProject.save();

        user.myProjects = user.myProjects ? [...user.myProjects, newProject._id] : [newProject._id];
        await user.save();

        res.status(201).json({ message: "Project Added successfully", project: newProject });

    } catch (error) {
        console.error("Add Project:", error);
        res.status(500).json({ message: "Error in Add Project", error: error.message });
    }
};

export const getMyProjectsController = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Received userId in backend:", userId);

        const userProjects = await Project.find({ members: new mongoose.Types.ObjectId(userId) });

        if (!userProjects.length) {
            return res.status(404).json({ message: "No projects found for this user" });
        }
        res.json(userProjects);

    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ message: "Error fetching user projects", error: error.message });
    }
};

export const getMyPublicProjectsController = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Received userId in backend:", userId);

        const userProjects = await Project.find({ members: new mongoose.Types.ObjectId(userId), isPublic: true });

        if (!userProjects.length) {
            return res.status(404).json({ message: "No projects found for this user" });
        }
        res.json(userProjects);

    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ message: "Error fetching user projects", error: error.message });
    }
};