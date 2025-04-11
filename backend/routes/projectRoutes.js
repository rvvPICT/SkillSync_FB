import express from 'express';
import Project from "../models/project.js";

import mongoose from 'mongoose';
import { addProjectController, getMyProjectsController , applyForProject , sendInvite } from '../controller/projectController.js';
import {authenticateUser} from '../middleware/authMiddleware.js'
//import { addProjectController, getMyProjectsController, getMyPublicProjectsController } from '../controller/projectController.js';

const router = express.Router();

router.post("/add-project/:userId", addProjectController);
router.get("/my-projects/:userId", getMyProjectsController);
//router.get("/my-public-projects/:userId", getMyPublicProjectsController);

router.post("/invite" , authenticateUser , sendInvite) ;

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

router.post('/apply' , applyForProject) ;
//router.post('/reviewApplication' , reviewApplication) ;
export default router;

