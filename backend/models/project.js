import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    domain: {type: String, required: true, trim: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    requiredSkills: {type: [String], default: []},
    requests: {type: Number, default: 0},
    teamSize: {type: Number, default: 1, min: 1},
    availableSlots: {type: Number, default: 0, min: 0},
    deadline: {type: Date, required: true},
    isPublic: {type: Boolean, default: true},
    applicants: [{user:{type:mongoose.Schema.Types.ObjectId , ref: "User"} , status : {type:String , enum:['pending' , 'approved' , 'rejected'],default:'pending'}}] ,
    invites:[{user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }}]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
