import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
    domainName: {type: String, required: true, trim: true},
    projectsListed: [{type: mongoose.Schema.Types.ObjectId, ref: "Project", default: []}],
}, { timestamps: true });

const Domain = mongoose.model("Domain", domainSchema);
export default Domain;