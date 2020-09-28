const express = require("express");

//Databases
const User = require("./Collections/Users");
const Post = require("./Collections/Posts");

const postsRouter = express.Router();
module.exports = postsRouter;

postsRouter.post("/getPosts", (req, res) => {
  //Finds all posts from the user
  Post.find({ username: req.body.username }, (err, posts) => {
    res.send(posts);
  });
});

postsRouter.post("/addPost", (req, res) => {
  //Finds user that uploaded the post
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      let uniqid = Date.now();
      //Defines post
      const newPost = new Post({
        username: req.body.username,
        title: req.body.title,
        subCheddar: req.body.subCheddar,
        image_video: req.body.image_video,
        bodyPost: req.body.bodyPost,
        postID: uniqid,
      });
      newPost.save();
      //Gets all posts of user
      Post.find({ username: req.body.username }, (err, posts) => {
        res.send(posts);
      });
    } else {
      res.send({ error: "user doesn't exist" });
    }
  });
});

postsRouter.post("/deletePost", (req, res) => {
  //Finds user that deleted the post
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      //Getting post's postID
      Post.find({ username: req.body.username }, (err, posts) => {
        posts = posts.reverse();
        const postID = posts[req.body.id]["postID"];
        //Deletes post based on postID
        Post.deleteOne({ postID: postID }, (err, success) => {
          //Gets remaining posts
          Post.find({ username: req.body.username }, (err, posts) => {
            res.send(posts);
          });
        });
      });
    } else {
      res.send({ error: "user doesn't exist" });
    }
  });
});

postsRouter.get("/viewPost/:postID", (req, res) => {
  //Find post based on postID
  Post.findOne({ postID: req.params.postID }, (err, post) => {
    if (post) {
      res.send(post);
    } else {
      res.send({
        error: "post does not exist",
      });
    }
  });
});

postsRouter.post("/upvoteRemoveUpvotePost/:increment", (req, res) => {
  //Upvote a post based on postID
  Post.findOneAndUpdate(
    { postID: req.body.postID },
    { $inc: { upvotes: req.params.increment } },
    { new: true },
    (err, response) => {
      res.send(response);
    }
  );
});

postsRouter.get("/getAllPosts/:subCheddar", (req, res) => {

  if (req.params.subCheddar == "all") {
      //Finds all posts
      Post.find({}, (err, posts) => {
        res.send({
          "posts": posts
        });
      })
  } else {
      //Find all posts of a specific subcheddar
      Post.find({subCheddar: req.params.subCheddar}, (err, posts) => {
        res.send({
          "posts": posts
        });
      })
    }
})