// tests/quiz.test.js
const request = require("supertest");
const app = require("../src/app");

describe("Quiz App API", () => {
  it("should create a quiz", async () => {
    const response = await request(app).post("/api/quizzes").send({
      title: "Sample Quiz",
      questions: [
        { id: "q1", text: "Question 1", options: ["A", "B", "C", "D"], correct_option: 1 },
      ],
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });
});
