import express from "express";
import { addAnswerController } from "../controllers/answerController.js";

const router = express.Router();

router.post("/question/:questionId/answer", addAnswerController);

export default router;
