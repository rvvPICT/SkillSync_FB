import Question from "../models/question.js";

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

