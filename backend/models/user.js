import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness
        validate: {
            validator: (value) => /^[a-z0-9_]+$/.test(value),
            message: "Username can only contain lowercase letters, numbers, and underscores."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Prefer not to say", ""],
    },
    avatar: { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    linkedin: { type: String },
    bio: { type: String },
    myProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project", default: [] }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        validate: {
            validator: (value) => value % 0.5 === 0,
            message: "Rating must be in increments of 0.5."
        }
    },
    fullName: { type: String, default: "" },
    phone: { type: String },
    location: { type: String },
    experienceLevel: { type: String },
    lookingForTeammates: { type: Boolean, default: false },
    availableForHackathons: { type: Boolean, default: false },
    isMentor: { type: Boolean, default: false } ,
    mynotifications: [{type : mongoose.Schema.Types.ObjectId , ref: "Notification" , default : []}] 
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
