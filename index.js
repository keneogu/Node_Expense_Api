const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our budget API...");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on app ${port}`);
});