const express = require("express");
const request = require("request");
const crypto = require("crypto");

const automatePostsRouter = express.Router();
module.exports = automatePostsRouter;

//Databases
const User = require("./Collections/Users");
const Post = require("./Collections/Posts");
const Posts = require("./Collections/Posts");

automatePostsRouter.get("/automateRandomUsers", (req, res) => {
  request.get("http://names.drycodes.com/10", (err, response, usernames) => {
    if (!err && response.statusCode == 200) {
      let myUsernames = usernames.slice(1, -1);
      myUsernames = myUsernames.split(",");

      for (let i = 0; i < 10; i++) {
        //Generates a random username
        let username = myUsernames[i];
        username = username.slice(1, -1);

        //Generates a random password
        const randomNumber = Math.floor(Math.random() * (15 - 8 + 1) + 8);
        let password = crypto.randomBytes(randomNumber).toString("hex");
        password = password.substring(0, randomNumber);

        const newUser = new User({
          username: username,
          password: password,
        });
        newUser.save();
      }

      res.send("done");
    }
  });
});

automatePostsRouter.post("/automateRandomPosts", (req, res) => {
  //Finds a random username to assign post to
  User.find({}, (err, users) => {
    const randomUsername =
      users[Math.floor(Math.random() * users.length)].username;
    const postID = Date.now();

    req.body.username = randomUsername;
    req.body.postID = postID;

    const newPost = new Post(req.body);
    newPost.save();

    res.send(req.body);
  });
});

