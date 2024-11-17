// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Quiz app running on port ${PORT}`);
});
