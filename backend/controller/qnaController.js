import Question from "../models/question.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const addQuestionController = async (req, res) => {
  try {
    console.log("Add question Request Received: ", req.body);

    // Extract userId from the body (change to req.params.userId if needed)
    const { userId, question, domain } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Create a new Question document
    const addedQuestion = new Question({
      seeker: userId,  // Ensure your schema has this field
      question,
      domain
    });

    // Save to database
    await addedQuestion.save();

    res.status(200).json({ message: "Question added successfully", question: addedQuestion });

  } catch (error) {
    console.error("Add question Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const viewQuestionController = async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      console.error("View Question Error:", error);
      res.status(500).json({ message: "Error Fetching Questions ", error: error.message });
    }
};

export const addAnswerController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answer, responder } = req.body;

    if (!questionId || !answer || !responder) {
      return res.status(400).json({ message: "Question ID, Answer, and Responder ID are required" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: { answer, responder } } },
      { new: true, upsert: true }
    ).populate("answers.responder", "name email");

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Answer added successfully", question: updatedQuestion });
  } catch (error) {
    console.error("Add answer Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// export const viewAnswerController = async (req, res) => {
//   try {
//     const answers = await Question.find();
//     res.json(answers);
//   } catch (error) {
//     console.error("View Question Error:", error);
//     res.status(500).json({ message: "Error Fetching Questions ", error: error.message });
//   }
// };

export const viewAnswerController = async (req, res) => {
  try {
    const { questionId } = req.params;
    
    if (!questionId) {
      return res.status(400).json({ message: "Question ID is required" });
    }
    
    // Find the question with populated answers
    const question = await Question.findById(questionId)
      .populate({
        path: 'answers.responder',
        select: 'username email' // Select only the fields you need
      })
      .populate('seeker', 'username email'); // Also populate the question asker
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    res.json(question);
  } catch (error) {
    console.error("View Question Error:", error);
    res.status(500).json({ message: "Error Fetching Question", error: error.message });
  }
};