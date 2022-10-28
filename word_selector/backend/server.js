const express = require("express");
const words = require("./assets/words.json");

const app = express();

const randomNumber = (number) => {
  return Math.floor(Math.random() * number);
};

app.use("/", (req, res) => {
  res.status(200).json(words.words[randomNumber(words.words.length)]);
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
