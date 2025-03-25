import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    domain: {type: String, required: true, trim: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    members: {type: [mongoose.Schema.Types.ObjectId], ref: "User"},
    requiredskills: {type: [String], default: []},
    requests: {type: Number, default: 0},
    totalMembers: {type: Number, default: 1, min: 1},
    availableSlots: {type: Number, default: 0, min: 0},
    deadline: {type: Date, required: true},
    isPublic: {type: Boolean, default: true},
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;