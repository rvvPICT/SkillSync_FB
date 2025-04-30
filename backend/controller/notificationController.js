import Notification from "../models/notifications.js";
import User from "../models/user.js";
import Project from "../models/project.js";

// Add fallback for Socket.IO emitting
const emitNotification = (userId, event, data) => {
    if (global.io) {
        console.log(`Emitting ${event} to user ${userId}:`, data);
        global.io.to(userId.toString()).emit(event, data);
    } else {
        console.warn('Socket.IO not initialized. Unable to emit event:', event);
    }
};

export const sendNotification = async (type, senderId, receiverId, projectId, message) => {
    try {
        const notification = new Notification({ type, sender: senderId, receiver: receiverId, project: projectId, message });
        await notification.save();

        // Add notification to receiver's notifications list
        await User.findByIdAndUpdate(
            receiverId,
            { $addToSet: { mynotifications: notification._id } }
        );

        // Use the safe emitting function
        emitNotification(receiverId.toString(), 'new-notification', notification);

        return notification;
    } catch (err) {
        console.error("Error sending notification:", err);
        throw err;
    }
};

export const getUserNotification = async (req, res) => {
    const { userId } = req.params;
    console.log("Received user to find Notifications:", userId);

    try {
        const user = await User.findById(userId)
            .populate({
                path: 'mynotifications',
                populate: [
                    { path: 'sender', select: 'username avatar' },
                    { path: 'receiver', select: 'username avatar' },
                    { path: 'project', select: 'title' }
                ]
            });

        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log("User successfully found for finding notifications");
        return res.status(200).json({ notifications: user.mynotifications });
    } catch (err) {
        console.log('Error fetching user notifications:', err);
        res.status(500).json({ message: "Server error!" });
    }
};

export const updateNotificationStatus = async (req, res) => {
    try {
        console.log("Processing notification status update");
        const { notificationId } = req.params;
        const { status } = req.body;
        
        console.log("Notification ID:", notificationId);
        console.log("Status:", status);
        
        // Input validation
        if (!notificationId || !status) {
            console.log("Missing required parameters");
            return res.status(400).json({ message: 'Missing required parameters' });
        }
        
        if (!['accepted', 'rejected'].includes(status)) {
            console.log("Invalid status:", status);
            return res.status(400).json({ message: 'Invalid status. Must be accepted or rejected' });
        }

        const notification = await Notification.findById(notificationId)
            .populate('sender', 'username')
            .populate('receiver', 'username');
            
        if (!notification) {
            console.log("Notification not found with ID:", notificationId);
            return res.status(404).json({ message: 'Notification not found' });
        }
        console.log("Notification found:", notification);

        // Update notification status
        notification.status = status;
        await notification.save();

        const project = await Project.findById(notification.project);
        if (!project) {
            console.log("Project not found with ID:", notification.project);
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log("Project found:", project.title);
        console.log("Available slots:", project.availableSlots);

        const userIdToUpdate = notification.type === 'application' 
            ? notification.sender 
            : notification.receiver;
        console.log("User ID to update:", userIdToUpdate);

        // Update applicant or invite status
        if (notification.type === 'application') {
            console.log("Processing application notification");
            const applicantIndex = project.applicants.findIndex(
                app => app.user && app.user.toString() === userIdToUpdate.toString()
            );
            console.log("Applicant index:", applicantIndex);
            
            if (applicantIndex >= 0) {
                project.applicants[applicantIndex].status = status === 'accepted' ? 'approved' : 'rejected';
                console.log("Updated applicant status to:", project.applicants[applicantIndex].status);
            } else {
                console.log("Applicant not found in project");
            }
        } else if (notification.type === 'invite') {
            console.log("Processing invite notification");
            const inviteIndex = project.invites.findIndex(
                inv => inv.user && inv.user.toString() === userIdToUpdate.toString()
            );
            console.log("Invite index:", inviteIndex);
            
            if (inviteIndex >= 0) {
                project.invites[inviteIndex].status = status;
                console.log("Updated invite status to:", status);
            } else {
                console.log("Invite not found in project");
            }
        }

        // If accepted, add user to project
        if (status === 'accepted') {
            console.log("Status is accepted, checking if user can be added to project");
            
            // Check if user is already a member
            const isAlreadyMember = project.members.some(
                memberId => memberId && memberId.toString() === userIdToUpdate.toString()
            );
            console.log("Is already a member:", isAlreadyMember);
            
            if (!isAlreadyMember) {
                // Check if there are available slots
                if (project.availableSlots > 0) {
                    console.log("Adding user to project members");
                    project.members.push(userIdToUpdate);
                    project.availableSlots -= 1;
                    console.log("Updated available slots:", project.availableSlots);
                    
                    // Add project to user's projects
                    console.log("Adding project to user's projects");
                    await User.findByIdAndUpdate(
                        userIdToUpdate,
                        { $addToSet: { myProjects: project._id } },
                        { runValidators: false }
                    );
                    console.log("User's projects updated");
                } else {
                    console.log("No available slots left in the project");
                    return res.status(400).json({ message: "No available slots left in the project" });
                }
            } else {
                console.log("User is already a member of the project");
            }
        }

        console.log("Saving project changes");
        await project.save();
        console.log("Project saved successfully");

        // Create response notification with correct sender and receiver
        console.log("Creating response notification");
        let senderForResponse, receiverForResponse;

        if (notification.type === 'application') {
            // For applications: decision maker is project owner (notification.receiver)
            // Person to notify is the applicant (notification.sender)
            senderForResponse = notification.receiver._id;
            receiverForResponse = notification.sender._id;
        } else if (notification.type === 'invite') {
            // For invites: decision maker is invitee (notification.receiver)
            // Person to notify is the project owner/sender (notification.sender)
            senderForResponse = notification.receiver._id;
            receiverForResponse = notification.sender._id;
        }

        const responder = notification.receiver;
        if (!responder) {
            console.log("Responder user not found");
            return res.status(404).json({ message: 'Responder user not found' });
        }
        
        const responseNotification = new Notification({
            type: 'response',
            sender: senderForResponse,
            receiver: receiverForResponse,
            project: notification.project,
            message: `${responder.username} has ${status} your ${notification.type}`
        });
        
        console.log("Saving response notification");
        await responseNotification.save();
        console.log("Response notification saved");

        // Add notification to receiver's notifications list
        await User.findByIdAndUpdate(
            receiverForResponse,
            { $addToSet: { mynotifications: responseNotification._id } }
        );

        // Emit notification to receiver
        console.log("Emitting notification to receiver:", receiverForResponse);
        emitNotification(receiverForResponse.toString(), 'new-notification', responseNotification);

        // Remove the original notification from user's notifications list
        console.log("Removing original notification from user's list");
        await User.findByIdAndUpdate(
            notification.receiver,
            { $pull: { mynotifications: notificationId } }
        );

        // Delete the original notification
        console.log("Deleting original notification");
        await Notification.findByIdAndDelete(notificationId);
        console.log("Original notification deleted");

        console.log("Notification handled successfully");
        res.json({ message: 'Notification handled successfully' });
    } catch (err) {
        console.error("Error updating notification:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        notification.isRead = true;
        await notification.save();
        
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error("Error marking notification as read:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const { userId } = req.body;
        
        console.log("Server: Deleting notification", notificationId, "for user", userId);
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        // Check if user is authorized to delete
        const isReceiver = notification.receiver && notification.receiver.toString() === userId;
        const isSender = notification.sender && notification.sender.toString() === userId;
        
        if (notification.type === 'response') {
            // For response notifications, either sender or receiver can delete
            if (!isReceiver && !isSender) {
                return res.status(403).json({ 
                    message: 'Not authorized to delete this notification'
                });
            }
        } else {
            // For other notification types, only receiver can delete
            if (!isReceiver) {
                return res.status(403).json({ 
                    message: 'Not authorized to delete this notification'
                });
            }
        }
        
        // Remove notification from user's notifications list
        await User.findByIdAndUpdate(
            userId,
            { $pull: { mynotifications: notificationId } }
        );
        
        // Delete the notification
        await Notification.findByIdAndDelete(notificationId);
        
        res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
        console.error("Server error deleting notification:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};