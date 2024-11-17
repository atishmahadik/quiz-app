Quiz App Backend
A simple RESTful API backend for a Quiz App that allows users to create quizzes, answer questions, and view results. This app uses in-memory storage (Map) to store data, making it lightweight and easy to set up.

Features
Create Quiz: Add a new quiz with multiple-choice questions.
Get Quiz: Retrieve quiz details (without revealing correct answers).
Submit Answer: Submit answers for quiz questions and receive immediate feedback.
Get Results: View user performance, including score and answer summary.
API Endpoints
1. Create Quiz
Endpoint: POST /api/quizzes
Description: Create a new quiz.
Request Body:
json
Copy code
{
  "id": "quiz1",
  "title": "JavaScript Basics",
  "questions": [
    {
      "id": "q1",
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correct_option": 1
    }
  ]
}
Response:
201 Created: { "message": "Quiz created successfully" }
400 Bad Request: { "error": "Quiz must have at least one question." }
2. Get Quiz
Endpoint: GET /api/quizzes/:id
Description: Fetch a quiz by its ID (correct answers are hidden).
Response:
200 OK:
json
Copy code
{
  "id": "quiz1",
  "title": "JavaScript Basics",
  "questions": [
    {
      "id": "q1",
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"]
    }
  ]
}
404 Not Found: { "error": "Quiz not found" }
3. Submit Answer
Endpoint: POST /api/quizzes/:quizId/questions/:questionId/answer
Description: Submit an answer for a specific question.
Request Body:
json
Copy code
{
  "selected_option": 1
}
Response:
200 OK (Correct):
json
Copy code
{ "message": "Correct answer!" }
200 OK (Incorrect):
json
Copy code
{
  "message": "Incorrect answer!",
  "correct_answer": "4"
}
404 Not Found: { "error": "Quiz not found" }
4. Get Results
Endpoint: GET /api/quizzes/:quizId/results/:userId
Description: Fetch the user's results for a quiz.
Response:
200 OK:
json
Copy code
{
  "quiz_id": "quiz1",
  "user_id": "user1",
  "score": 1,
  "answers": [
    {
      "question_id": "q1",
      "selected_option": 1,
      "is_correct": true
    }
  ]
}
404 Not Found: { "error": "No answers found for this quiz" }
Setup and Installation
Prerequisites
Node.js (v16 or higher)
npm (Node Package Manager)
Steps to Run Locally
Clone the repository:

bash
Copy code
git clone <your-repo-url>
cd quiz-app
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
The server will run at http://localhost:3000.

Running Tests
Run the tests to verify the functionality of the APIs:

bash
Copy code
npm test
Technical Details
Backend Framework: Node.js with Express.js
Storage: In-memory storage using JavaScript Map (temporary storage for simplicity).
HTTP Methods:
POST for creating quizzes and submitting answers.
GET for fetching quizzes and results.
Known Issues and Limitations
Data Persistence: In-memory storage is used, so data is lost when the server restarts. For production use, consider switching to a database (e.g., Redis, MongoDB).
Scalability: This setup is ideal for a single instance. It is not suitable for distributed systems without additional adjustments.
Validation: Limited input validation is implemented. Additional validations can improve robustness.
Future Improvements
Integrate persistent storage like Redis or PostgreSQL for scalability.
Add authentication and user management.
Enhance input validation and error handling.
Improve test coverage with integration tests.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch.
Submit a pull request.
License
This project is licensed under the MIT License.

