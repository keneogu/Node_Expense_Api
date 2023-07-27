const express = require("express");
const connectDb = require("./config/connectDb");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const morgan = require("morgan");


require("dotenv").config();
connectDb();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to our budget API...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/v1", require("./routes/transactionRoutes"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on app ${port}`);
});
