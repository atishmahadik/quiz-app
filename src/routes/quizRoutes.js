// src/routes/quizRoutes.js
const express = require("express");
const {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResults,
} = require("../controllers/quizController");

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes/:id", getQuiz);
router.post("/quizzes/:quizId/questions/:questionId/answer", submitAnswer);
router.get("/quizzes/:quizId/results/:userId", getResults);

module.exports = router;
