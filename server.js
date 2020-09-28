const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAuthen = require("./userAuthen");
const postsRouter = require("./posts");
const commentsRouter = require("./comments");
const automatePostsRouter = require("./automatePosts");

//Setting up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connecting to mongodb database
const mongodbUrl =
  "mongodb+srv://flappybird:patrickpatterson333@cheddar.eysgs.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  //Allows application to access the API
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", userAuthen);
app.use("/", postsRouter);
app.use("/", commentsRouter);
app.use("/", automatePostsRouter);

app.listen(process.env.PORT || 5000, () => console.log("Listening"));
