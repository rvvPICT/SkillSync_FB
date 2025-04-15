import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
 	answer:{ type:String ,required: true},
  responder :{type: mongoose.Schema.Types.ObjectId, ref: "User"},

}, {timestamps: true});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  domain: { type: String, required: true },
  seeker :{type: mongoose.Schema.Types.ObjectId, ref: "User"},
	answers :{type: [answerSchema], default: []}
}, {timestamps: true});


const Question = mongoose.model("Question", questionSchema);

export default Question;