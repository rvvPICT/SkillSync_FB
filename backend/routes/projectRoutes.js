// import express from 'express';
// import mongoose from 'mongoose';
// import Project from "../models/project.js";

// const router = express.Router();

// router.get("/", async(req, res) => {
//     try {
//         const publicProjects = await Project.find();
//         res.json(publicProjects);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching public projects ", error });
//     }
// });

// router.get("/public", async(req, res) => {
//     try {
//         const publicProjects = await Project.find({ isPublic: true });
//         res.json(publicProjects);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching public projects ", error });
//     }
// });

// router.get("/user/:userId/projects", async (req, res) => {
//     try {
//         const { userId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const userProjects = await Project.find({ members: new mongoose.Types.ObjectId(userId) });

//         if (!userProjects.length) {
//             return res.status(404).json({ message: "No projects found for this user" });
//         }

//         res.json(userProjects);
//     } catch (error) {
//         console.error("Error fetching user projects:", error);
//         res.status(500).json({ message: "Error fetching user projects", error: error.message });
//     }
// });
// export default router;



import express from 'express';
import Project from "../models/project.js";
import { addProjectController, getMyProjectsController } from '../controller/projectController.js';

const router = express.Router();

router.post("/add-project/:userId", addProjectController);
router.get("/my-projects/:userId", getMyProjectsController);

router.get("/", async(req, res) => {
    try {
        const publicProjects = await Project.find();
        res.json(publicProjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching public projects ", error });
    }
});

router.get("/public", async(req, res) => {
    try {
        const publicProjects = await Project.find({ isPublic: true });
        res.json(publicProjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching public projects ", error });
    }
});
export default router;

