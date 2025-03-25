import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const editProfController = async (req, res) => {
  try {
		console.log("Edit Profile Request Received: ", req.body);

		const { userId } = req.params;
		const { fullName, username, avatar, phone, location, experienceLevel, linkedin, skills, lookingForTeammates, availableForHackathons, bio } = req.body;

		if (!userId) return res.status(400).json({ message: "User ID is required" });

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				fullName,
				username,
				avatar,
				phone,
				location,
				experienceLevel,
				linkedin,
				skills,
				lookingForTeammates,
				availableForHackathons,
				bio,
			},
			{ new: true } // Returns the updated document
		);

		if (!updatedUser) return res.status(404).json({ message: "User not found" });

		res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

  } catch (error) {
		console.error("Edit Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
}