import { populate } from "dotenv";
import Notification from "../models/notifications.js";
import notifications from "../models/notifications.js";
import User from "../models/user.js";
import Project from "../models/project.js";

export const sendNotification = async(type , senderId , receiverId ,projectId , message) => {
    const notification = new Notification({type, sender:senderId , receiver:receiverId , project:projectId , message}) 
    await notification.save() ;

    global.io.to(receiverId.toString()).emit('new-notifcation' , notification) ;

    return notification;
};

export const getUserNotification = async (req , res) => {
    const {userId} = req.params ;
    console.log("Received user to find Notifications :" , userId) ;
    
    try {
        const user = await User.findById(userId)
        .populate({
            path : 'mynotifications' ,
            populate : [
                {path : 'sender' , select: 'username avatar'},
                {path : 'project' , select: 'title'}
            ]
        });

        if(!user){
            return res.status(404).json({message : "User not found "}) ;
        }
        console.log("User succesfully found for finding notification") ;
        return res.status(200).json({notifications:user.mynotifications}) ;
    }catch(err){
        console.log('error fetching user notifications :',err) ;
        res.status(500).json({message:"Server error !"}) ;
    } 
};

export const updateNotificationStatus = async (req, res) => {
    try {
        console.log("Reached here :") ;
        const { notificationId } = req.params;
        const { status } = req.body;

        console.log("NotificationId :" , notificationId) ;
        console.log("Status :" , status) ;
        
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Update status
        notification.status = status;
        console.log("Notification status: ", notification.status);
        await notification.save();

        // Proceed only if status is accepted
        if (status === 'accepted') {
            const project = await Project.findById(notification.project);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            const userIdToAdd = notification.type === 'application'
            ? notification.sender
            : notification.receiver;

            const userToAdd = await User.findById(userIdToAdd);
            if (!project.members.includes(userToAdd._id)) {
                project.members.push(userToAdd._id);
            
                if (!userToAdd.myProjects.includes(project._id)) {
                    userToAdd.myProjects.push(project._id);
                }
            
                await project.save();
                await userToAdd.save();  // Save updated user too!
            }
        }
        console.log("Reached Here !")

        const userIdToUpdate = notification.type === 'application'
            ? notification.sender
            : notification.receiver;

        const userToUpdate = await User.findById(userIdToUpdate);

        const project = await Project.findById(notification.project);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (notification.type === 'application') {
            const applicant = project.applicants.find(app => app.user.toString() === userIdToUpdate.toString());
            if (applicant) {
                applicant.status = status === 'accepted' ? 'approved' : 'rejected';
            }
        } else if (notification.type === 'invite') {
            const invitee = project.invites.find(inv => inv.user.toString() === userIdToUpdate.toString());
            if (invitee) {
                invitee.status = status;
            }
        }

        // Only add to members/myProjects if accepted
        if (status === 'accepted') {
            if (!project.members.includes(userToUpdate._id)) {
                project.members.push(userToUpdate._id);

                if (!userToUpdate.myProjects.includes(project._id)) {
                    userToUpdate.myProjects.push(project._id);
                }
            }
        }

        // Save changes
        await project.save();
        await userToUpdate.save();


        await Notification.findByIdAndDelete(notificationId);

        res.json({ message: 'Notification handled successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
