import express from "express";
import Question from "../models/question.js";
import mongoose from "mongoose";
import { addQuestionController,viewQuestionController, addAnswerController, viewAnswerController } from "../controller/qnaController.js";
//import { viewQuestionController } from "../controller/viewQuestionController.js";
import { errorHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// Auth Routes
router.post("/question", addQuestionController);
router.get("/viewQuestion", viewQuestionController);
router.post("/question/:questionId/answer", addAnswerController);
router.get("/viewAnswers/:questionId",viewAnswerController);

router.use(errorHandler);

export default router;

