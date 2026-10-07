const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Welcome to Yamnuska Mountain Resort!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
