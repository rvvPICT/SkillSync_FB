import mongoose from "mongoose";
import Project from "../models/project.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import { application } from "express";
import Notification from "../models/notifications.js";

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





export const applyForProject = async(req,res) => {
    const {projectId , userId} = req.body ;

    console.log("Received projectId:", projectId);
    console.log("Received userId:", userId);

    //For saving the notification :
    const ProjectFind = await Project.findById(projectId) ;
    if(!ProjectFind){
        console.log("No such project found !") ;
    }

    const senderName = await User.findById(userId) ;
    const ownerName = await User.findById(ProjectFind.owner) ;
    

    console.log("Sender :" , senderName) ;
    console.log("Receivers :" , ownerName) ;
    console.log("Project :" , ProjectFind.title) ;
    console.log("Type :" , application) ;
    console.log("Message :" , userId , "Wants to apply for " , ProjectFind.title) ;



    const NewNotification = new Notification({
        type : 'application' ,
        sender : userId ,
        receiver : ProjectFind.owner ,
        project : ProjectFind ,
        message : `${senderName} wants to apply for your project ${ProjectFind.title}` 
        
    })

    await NewNotification.save() ;
    console.log("Notification saved Succesfully !") ;

    await User.findByIdAndUpdate(
        ProjectFind.owner,
        { $push: { mynotifications: NewNotification._id } },
        { new: true }
      );
      console.log("Notification pushed to owner's user model");

    console.log(NewNotification) ;

    try {
        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid projectId or userId format");
            return res.status(400).json({ message: "Invalid projectId or userId format" });
        }
        
        const project = await Project.findById(projectId) ;
        if(!project){
           console.log("Project not found !") ; 
           return res.status(404).json({message:"No such Project Found !"}) ;
        }
        // if(project.members.includes(userId)){
        //    console.log("Error: User is already a member of the project!");
        //    return res.status(404).json({message:"You are already a part of the project !"}) ;
        // }
        
        const memberIds = project.members.map(id => id.toString());
        if (memberIds.includes(userId)) {
            console.log("Error: User is already a member of the project!");
            return res.status(400).json({ message: "You are already a part of the project!" });
        }

        const applicantIndex = project.applicants.findIndex(applicant=>applicant.user && applicant.user.toString()===userId);
        if(applicantIndex !==-1){
            console.log("Error: User has already applied for the project!");
            return res.status(400).send("You have already applied for the project!") ;
        }

        project.applicants.push({user:userId , status :"pending"}) ;
        
        //project.availableSlots = Math.max(project.teamSize - project.members.length -project.applicants.filter(applicant => applicant.status === 'approved').length, 0) ;
        const approvedApplicantsCount = project.applicants.filter(
            applicant => applicant.status === 'approved'
        ).length;
        
        project.availableSlots = Math.max(
            project.teamSize - project.members.length - approvedApplicantsCount, 
            0
        );

        await project.save() ;
        console.log("User successfully applied for the project!");
        res.status(200).json({message:"Applied for the project!"}) ;

    }catch(error){
        console.log(error);
        res.status(500).send({message:'Error for applying the project' , error: error.message}) ;
    }
};

export const sendInvite= async (req,res) =>{
    try {
        console.log("Checkpt1") ;
        const {projectId , userIdToInvite } = req.body ;
        const ownerId = req.user.userId ;

        const project = await Project.findOne({_id:projectId}) ;
        console.log("OwnerId :" , ownerId) ;
        console.log("ProjectId :" , projectId) ;
        console.log("Sending invitation to :" , userIdToInvite) ;

        const ownerName = User.findById(ownerId) ;
        const NewNotification = new Notification({
            type : 'invite' ,
            sender : ownerId ,
            receiver : userIdToInvite ,
            project : project ,
            message : `${ownerName} is inviting you to join the project : ${project.title}`
        })

        await NewNotification.save() ;
        console.log("Invite notification saved succesfully !") ;

        await User.findByIdAndUpdate(
            userIdToInvite ,
            { $push: { mynotifications: NewNotification._id } },
            { new: true }
          );
          console.log("Notification pushed to owner's user model");

        if(!project){
           return  res.status(404).json({message:"Project Not found !"}) ;
        }

        if(!project.owner.equals(ownerId)){
            return res.status(403).json({message: "Only owner of the project can send invites "}) ;
        }

        const alreadyInvited = project.invites.find(invites=>
            invites.user.toString()=== userIdToInvite
        ) ;

        if(alreadyInvited){
            return res.status(400).json({message : "User already invited !"});
        }

        project.invites.push({user:userIdToInvite , status : "pending"}) ;
        await project.save() ;

        return res.status(200).json({message : "Invite sent succesfully !"}) ;
    }catch(error){
        console.log("Error in sending invite :" , error) ;
        return res.status(500).json({message : "Server errror "}) ;
    }
};
// export const getAllAplicantsForOwner = async (req , res) => {
//     try {
//         const ownerId = res.user.id ;

//         const projects = await Project.find({owner : ownerId}) ;

//         if(!projects || projects.length === 0) {
//             return res.status(404).json({message : "No projects found for the owner."}) ;
//         }

//         const allApplicants = projects.flatMap(project=>
//             project.applicants.map(applicant=>({
//                 projectId = project._id ,
//                 projectTitle = projext.title ,
//                 user:applicant.user ,
//                 status:applicant.status
//             }))
//         );
//         res.status(200).json({applicants : allApplicants}) ;
//     }catch(error){
//         console.log(error) ;
//         res.status(500).json({message : "Server error "})
//     }
// }