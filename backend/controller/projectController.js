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
            availableSlots: teamSize-1,
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

// export const sendInvite= async (req,res) =>{
//     try {
//         console.log("Checkpt1") ;
//         const {projectId , userIdToInvite } = req.body ;
//         const ownerId = req.user.userId ;

//         const project = await Project.findOne({_id:projectId}) ;
//         console.log("OwnerId :" , ownerId) ;
//         console.log("ProjectId :" , projectId) ;
//         console.log("Sending invitation to :" , userIdToInvite) ;

//         const ownerName = User.findById(ownerId) ;
//         const NewNotification = new Notification({
//             type : 'invite' ,
//             sender : ownerId ,
//             receiver : userIdToInvite ,
//             project : project ,
//             message : `${ownerName} is inviting you to join the project : ${project.title}`
//         })

//         await NewNotification.save() ;
//         console.log("Invite notification saved succesfully !") ;

//         await User.findByIdAndUpdate(
//             userIdToInvite ,
//             { $push: { mynotifications: NewNotification._id } },
//             { new: true }
//           );
//           console.log("Notification pushed to owner's user model");

//         if(!project){
//            return  res.status(404).json({message:"Project Not found !"}) ;
//         }

//         if(!project.owner.equals(ownerId)){
//             return res.status(403).json({message: "Only owner of the project can send invites "}) ;
//         }

//         const alreadyInvited = project.invites.find(invites=>
//             invites.user.toString()=== userIdToInvite
//         ) ;

//         if(alreadyInvited){
//             return res.status(400).json({message : "User already invited !"});
//         }

//         project.invites.push({user:userIdToInvite , status : "pending"}) ;
//         await project.save() ;

//         return res.status(200).json({message : "Invite sent succesfully !"}) ;
//     }catch(error){
//         console.log("Error in sending invite :" , error) ;
//         return res.status(500).json({message : "Server errror "}) ;
//     }
// };

export const sendInvite = async (req, res) => {
  try {
      const {projectId, userIdToInvite} = req.body;
      const ownerId = req.user.userId;

      const project = await Project.findOne({_id: projectId});
      
      if (!project) {
          return res.status(404).json({message: "Project Not found!"});
      }

      if (!project.owner.equals(ownerId)) {
          return res.status(403).json({message: "Only owner of the project can send invites"});
      }

      // Check if user is already invited
      const alreadyInvited = project.invites.some(invite => 
          invite.user.toString() === userIdToInvite
      );

      // Check if user has already applied
      const alreadyApplied = project.applicants.some(applicant => 
          applicant.user.toString() === userIdToInvite
      );

      if (alreadyInvited || alreadyApplied) {
          return res.status(400).json({message: "User already invited or has applied to this project!"});
      }

      const ownerUser = await User.findById(ownerId);
      const NewNotification = new Notification({
          type: 'invite',
          sender: ownerId,
          receiver: userIdToInvite,
          project: project._id,
          message: `${ownerUser.username} is inviting you to join the project: ${project.title}`
      });

      await NewNotification.save();

      await User.findByIdAndUpdate(
          userIdToInvite,
          { $push: { mynotifications: NewNotification._id } },
          { new: true }
      );

      project.invites.push({user: userIdToInvite, status: "pending"});
      await project.save();

      return res.status(200).json({message: "Invite sent successfully!"});
  } catch (error) {
      console.log("Error in sending invite:", error);
      return res.status(500).json({message: "Server error"});
  }
};

export const getProjectMembers = async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId).populate('members', 'username email');
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      return res.json({ members: project.members });
    } catch (error) {
      console.error("Error fetching team members:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


export const applyForProject = async(req, res) => {
    try {
        const { projectId, userId } = req.body;
        
        console.log("Received projectId:", projectId);
        console.log("Received userId:", userId);
        
        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(userId)) {
            console.log("Invalid projectId or userId format");
            return res.status(400).json({ message: "Invalid projectId or userId format" });
        }
        
        // Find project
        let project;
        try {
            project = await Project.findById(projectId);
            console.log("Project found:", project ? "Yes" : "No");
        } catch (err) {
            console.error("Error finding project:", err);
            return res.status(500).json({ message: "Error finding project", error: err.message });
        }
        
        if (!project) {
            console.log("Project not found!");
            return res.status(404).json({ message: "No such Project Found!" });
        }
        
        // Find sender
        let sender;
        try {
            sender = await User.findById(userId);
            console.log("Sender found:", sender ? "Yes" : "No");
        } catch (err) {
            console.error("Error finding sender:", err);
            return res.status(500).json({ message: "Error finding sender", error: err.message });
        }
        
        if (!sender) {
            console.log("User not found!");
            return res.status(404).json({ message: "User not found!" });
        }
        
        // Find owner
        let owner;
        try {
            owner = await User.findById(project.owner);
            console.log("Owner found:", owner ? "Yes" : "No");
        } catch (err) {
            console.error("Error finding owner:", err);
            return res.status(500).json({ message: "Error finding project owner", error: err.message });
        }
        
        if (!owner) {
            console.log("Project owner not found!");
            return res.status(404).json({ message: "Project owner not found!" });
        }
        
				// Check if user is already a member
				try {
					console.log("Project members:", project.members);
					// Filter out any null or undefined values before mapping
					const memberIds = project.members
							.filter(id => id !== null && id !== undefined)
							.map(id => id.toString());
					console.log("Member IDs:", memberIds);
					
					if (memberIds.includes(userId)) {
							console.log("Error: User is already a member of the project!");
							return res.status(400).json({ message: "You are already a part of the project!" });
					}
				} catch (err) {
					console.error("Error checking membership:", err);
					return res.status(500).json({ message: "Error checking project membership", error: err.message });
				}
        
        // Check if user has already applied
        let applicantIndex = -1;
        try {
            console.log("Project applicants:", project.applicants);
            if (project.applicants && Array.isArray(project.applicants)) {
                applicantIndex = project.applicants.findIndex(applicant => 
                    applicant && applicant.user && applicant.user.toString() === userId
                );
                console.log("Applicant index:", applicantIndex);
            } else {
                console.log("No applicants array or not an array");
                // Initialize if it doesn't exist
                project.applicants = [];
            }
        } catch (err) {
            console.error("Error checking applicants:", err);
            return res.status(500).json({ message: "Error checking project applicants", error: err.message });
        }
        
        if (applicantIndex !== -1) {
            console.log("Error: User has already applied for the project!");
            return res.status(400).json({ message: "You have already applied for the project!" });
        }
        
        // Create notification
        let newNotification;
        try {
            newNotification = new Notification({
                type: 'application',
                sender: userId,
                receiver: project.owner,
                project: project._id,
                message: `${sender.username} wants to apply for your project "${project.title}"`
            });
            
            await newNotification.save();
            console.log("Notification saved successfully!");
        } catch (err) {
            console.error("Error creating notification:", err);
            return res.status(500).json({ message: "Error creating notification", error: err.message });
        }
        
        // Update owner's notifications array
        try {
            await User.findByIdAndUpdate(
                project.owner,
                { $push: { mynotifications: newNotification._id } },
                { new: true }
            );
            console.log("Notification pushed to owner's user model");
        } catch (err) {
            console.error("Error updating owner's notifications:", err);
            return res.status(500).json({ message: "Error updating owner's notifications", error: err.message });
        }
        
        // Add user to project applicants
        try {
            project.applicants.push({ user: userId, status: "pending" });
            
            // Update available slots
            const approvedApplicantsCount = project.applicants.filter(
                applicant => applicant && applicant.status === 'approved'
            ).length;
            
            project.availableSlots = Math.max(
                project.teamSize - project.members.length - approvedApplicantsCount, 
                0
            );
            
            await project.save();
            console.log("User successfully applied for the project!");
        } catch (err) {
            console.error("Error updating project:", err);
            return res.status(500).json({ message: "Error updating project", error: err.message });
        }
        
        res.status(200).json({ msg: "Applied for the project!" });
        
    } catch (error) {
        console.error("Error applying for project:", error);
        res.status(500).json({ message: 'Error applying for the project', error: error.message });
    }
};

export const acceptProjectInvite = async (req, res) => {
	try {
		const { projectId, userId, notificationId } = req.body;
		
		if (!projectId || !userId || !notificationId) {
			return res.status(400).json({ message: "Missing required fields" });
		}
		
		if (!mongoose.Types.ObjectId.isValid(projectId) || 
				!mongoose.Types.ObjectId.isValid(userId) ||
				!mongoose.Types.ObjectId.isValid(notificationId)) {
			return res.status(400).json({ message: "Invalid ID format" });
		}
		
		const project = await Project.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		
		const notification = await Notification.findById(notificationId);
		if (!notification) {
			return res.status(404).json({ message: "Notification not found" });
		}
		
		if (notification.type !== 'invite' || notification.receiver.toString() !== userId) {
			return res.status(403).json({ message: "Invalid notification or unauthorized access" });
		}
		
		if (project.members.length >= project.teamSize) {
			return res.status(400).json({ message: "Project team is already full" });
		}
		
		const memberIds = project.members.map(id => id.toString());
		if (memberIds.includes(userId)) {
			return res.status(400).json({ message: "You are already a member of this project" });
		}
		
		project.members.push(userId);
		
		const approvedApplicantsCount = project.applicants.filter(
			applicant => applicant.status === 'approved'
		).length;
		
		project.availableSlots = Math.max(
			project.teamSize - project.members.length - approvedApplicantsCount, 
			0
		);
		
		notification.status = 'accepted';
		
		await Promise.all([project.save(), notification.save()]);
		
		const user = await User.findById(userId);
		if (user && (!user.myProjects || !user.myProjects.includes(projectId))) {
			user.myProjects = user.myProjects ? [...user.myProjects, projectId] : [projectId];
			await user.save();
		}
		
		res.status(200).json({
			success: true,
			msg: "Successfully joined the project!",
			project: {
				_id: project._id,
				title: project.title,
				members: project.members.length
			}
		});
		
	} catch (error) {
		console.error("Error accepting project invitation:", error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// export const acceptProjectApplication = async (req, res) => {
//   try {
//     const { projectId, otherId, notificationId } = req.body;
    
//     if (!projectId || !otherId || !notificationId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
    
//     if (!mongoose.Types.ObjectId.isValid(projectId) || 
//         !mongoose.Types.ObjectId.isValid(otherId) ||
//         !mongoose.Types.ObjectId.isValid(notificationId)) {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
    
//     const project = await Project.findById(projectId);
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }
    
//     // Find the notification
//     const notification = await Notification.findById(notificationId);
//     if (!notification) {
//       return res.status(404).json({ message: "Notification not found" });
//     }
    
//     // Check if this is a valid application notification
//     if (notification.type !== 'application') {
//       return res.status(403).json({ message: "Invalid notification type" });
//     }
    
//     // Make sure the notification is for this project
//     if (notification.project.toString() !== projectId) {
//       return res.status(403).json({ message: "Notification does not match this project" });
//     }
    
//     // Ensure the applicant (sender) is the otherId
//     if (notification.sender.toString() !== otherId) {
//       return res.status(403).json({ message: "Invalid applicant ID" });
//     }
    
//     // Check if project is full
//     if (project.members.length >= project.teamSize) {
//       return res.status(400).json({ message: "Project team is already full" });
//     }
    
//     // Check if user is already a member
//     const memberIds = project.members.map(id => id.toString());
//     if (memberIds.includes(otherId)) {
//       return res.status(400).json({ message: "User is already a member of this project" });
//     }
    
//     // Add the user to members
//     project.members.push(otherId);
    
//     // Update the applicant status in the project
//     const applicantIndex = project.applicants.findIndex(
//       applicant => applicant.user && applicant.user.toString() === otherId
//     );
    
//     if (applicantIndex !== -1) {
//       project.applicants[applicantIndex].status = 'approved';
//     }
    
//     // Update available slots
//     const approvedApplicantsCount = project.applicants.filter(
//       applicant => applicant.status === 'approved'
//     ).length;
    
//     project.availableSlots = Math.max(
//       project.teamSize - project.members.length - approvedApplicantsCount, 
//       0
//     );
    
//     // Mark notification as accepted
//     notification.status = 'accepted';
    
//     // Save both project and notification
//     await Promise.all([project.save(), notification.save()]);
    
//     // Add project to user's projects list
//     const user = await User.findById(otherId);
//     if (user && (!user.myProjects || !user.myProjects.includes(projectId))) {
//       user.myProjects = user.myProjects ? [...user.myProjects, projectId] : [projectId];
//       await user.save();
//     }
    
//     res.status(200).json({
//       success: true,
//       msg: "Application accepted! User has joined the project.",
//       project: {
//         _id: project._id,
//         title: project.title,
//         members: project.members.length
//       }
//     });
    
//   } catch (error) {
//     console.error("Error accepting project application:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const acceptProjectApplication = async (req, res) => {
  try {
    const { projectId, otherId, notificationId } = req.body;

    // Validate input
    if (!projectId || !otherId || !notificationId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(otherId) ||
      !mongoose.Types.ObjectId.isValid(notificationId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Retrieve project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Retrieve notification
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Validate notification
    if (
      notification.type !== 'application' ||
      notification.project.toString() !== projectId ||
      notification.sender.toString() !== otherId
    ) {
      return res.status(403).json({ message: "Invalid notification or unauthorized access" });
    }

    // Check if project is full
    if (project.members.length >= project.teamSize) {
      return res.status(400).json({ message: "Project team is already full" });
    }

    // Check if user is already a member
    if (project.members.includes(otherId)) {
      return res.status(400).json({ message: "User is already a member of this project" });
    }

    // Add user to members
    project.members.push(otherId);

    // Update applicant status
    const applicant = project.applicants.find(
      (applicant) => applicant.user.toString() === otherId
    );
    if (applicant) {
      applicant.status = 'approved';
    } else {
      return res.status(404).json({ message: "Applicant not found in project" });
    }

    // Update available slots
    const approvedApplicantsCount = project.applicants.filter(
      (applicant) => applicant.status === 'approved'
    ).length;

    project.availableSlots = Math.max(
      project.teamSize - project.members.length - approvedApplicantsCount,
      0
    );

    // Mark notification as accepted
    notification.status = 'accepted';

    // Save changes
    await Promise.all([project.save(), notification.save()]);

    // // Update user's project list
    // const user = await User.findById(otherId);
    // if (user && !user.myProjects.includes(projectId)) {
    //   user.myProjects.push(projectId);
    //   await user.save();
    // }
		await User.findByIdAndUpdate(otherId, {
			$addToSet: { myProjects: projectId },
		});
		

    res.status(200).json({
      success: true,
      msg: "Application accepted! User has joined the project.",
      project: {
        _id: project._id,
        title: project.title,
        members: project.members.length,
      },
    });
  } catch (error) {
    console.error("Error accepting project application:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
