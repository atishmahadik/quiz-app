// src/controllers/quizController.js
const { quizzes, results } = require("../models/dataStore");

exports.createQuiz = (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const quizId = `quiz_${Date.now()}`;
  quizzes.set(quizId, { id: quizId, title, questions });

  res.status(201).json({ id: quizId });
};

exports.getQuiz = (req, res) => {
  const { id } = req.params;
  const quiz = quizzes.get(id);

  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const sanitizedQuiz = {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map(({ id, text, options }) => ({
      id,
      text,
      options,
    })),
  };

  res.json(sanitizedQuiz);
};

exports.submitAnswer = (req, res) => {
  const { quizId, questionId } = req.params;
  const { selected_option } = req.body;

  const quiz = quizzes.get(quizId);
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const question = quiz.questions.find((q) => q.id === questionId);
  if (!question) return res.status(404).json({ error: "Question not found" });

  const is_correct = question.correct_option === selected_option;

  const resultKey = `${quizId}_${req.body.user_id}`;
  const userResults = results.get(resultKey) || { answers: [], score: 0 };

  userResults.answers.push({ question_id: questionId, selected_option, is_correct });
  if (is_correct) userResults.score += 1;

  results.set(resultKey, userResults);

  res.json({
    is_correct,
    correct_answer: is_correct ? null : question.options[question.correct_option],
  });
};

exports.getResults = (req, res) => {
  const { quizId, userId } = req.params;
  const resultKey = `${quizId}_${userId}`;

  const userResults = results.get(resultKey);
  if (!userResults) return res.status(404).json({ error: "Results not found" });

  res.json(userResults);
};
