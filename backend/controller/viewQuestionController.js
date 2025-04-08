import Question from "../models/question.js";
import dotenv from "dotenv";

dotenv.config();

// export const viewQuestionController = async (req, res) => {
//   try {
//     console.log("View questions request received");

//     // Fetch all questions from the database
//     const questions = await Question.find();

//     res.status(200).json({ message: "Questions retrieved successfully", questions });
//   } catch (error) {
//     console.error("View question error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// export const viewQuestionController = async (req, res) => {
//     try {
//         const { userId } = req.params;  

//         // If userId is provided, filter by userId; otherwise, get all questions
//         const query = userId ? { userId } : {};
//         const questions = await Question.find(query).populate("userId", "username email");

//         // Return an empty array instead of 404 when no questions found
//         res.status(200).json(questions); // Always return status 200, even with empty array
//     } catch (error) {
//         console.error("View Question Error:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };


export const viewQuestionController = async (req, res) => {
    try {
      const { userId } = req.params;  
  
      // If userId is provided, filter by seeker; otherwise, get all questions
      const query = userId ? { seeker: userId } : {};
      
      // Use the correct field name 'seeker' instead of 'userId'
      const questions = await Question.find(query).populate({
        path: "seeker", // Changed from userId to seeker
        select: "username fullName email avatar" // Select only the fields you need
      });
      
      res.status(200).json(questions);
    } catch (error) {
      console.error("View Question Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };