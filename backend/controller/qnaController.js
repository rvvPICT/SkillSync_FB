// import Question from "../models/question.js";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config();

// export const addQuestionController = async (req, res) => {
//   try {
//     console.log("Add question Request Received: ", req.body);

// 		const { userId } = req.params;
// 		const { question, domain } = req.body;

// 		if (!userId) return res.status(400).json({ message: "User ID is required" });

// 		const addedQuestion = await Question(
// 			userId,
// 			{
// 				question,
//                 domain
// 			},
// 			{ new: true } // Returns the updated document
// 		);

// 		await addedQuestion.save();

// 		res.status(200).json({ message: "Question added successfully", question: addedQuestion});

		
//   } catch (error) {
// 		console.error("Add question Error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
// 	}
// }


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
