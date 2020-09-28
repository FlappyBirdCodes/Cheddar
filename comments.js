const express = require("express");

//Databases
const Post = require("./Collections/Posts");
const Comment = require("./Collections/Comments");
const { response } = require("express");

const commentsRouter = express.Router();
module.exports = commentsRouter;

commentsRouter.post("/getComments", (req, res) => {
  //Get all comments based on postID
  Comment.find({ postID: req.body.postID }, (err, comments) => {
    res.send({ comments: comments });
  });
});

commentsRouter.post("/addComment", (req, res) => {
  //Find post based on postID
  Post.findOne({ postID: req.body.postID }, (err, post) => {
    if (post) {
      //Creates new comment
      const newComment = new Comment({
        postID: req.body.postID,
        commentID: req.body.commentID,
        commenter: req.body.commenter,
        comment: req.body.comment,
        time: req.body.time,
        upvotes: req.body.upvotes,
      });
      newComment.save();
      //Send all comments for that post
      Comment.find({ postID: req.body.postID }, (err, comments) => {
        res.send(comments);
      });
    } else {
      res.send({
        error: "Post does not exist",
      });
    }
  });
});

commentsRouter.post("/deleteComment", (req, res) => {
  //Delete comment based on commentID
  Comment.deleteOne({ commentID: req.body.commentID }, (err, success) => {
    //Send all comments for that post
    Comment.find({ postID: req.body.postID }, (err, comments) => {
      res.send(comments);
    });
  });
});

commentsRouter.post("/upvoteRemoveUpvoteComment/:increment", (req, res) => {
  //Upvote a comment based on commentID
  Comment.findOneAndUpdate(
    { commentID: req.body.commentID },
    { $inc: { upvotes: req.params.increment } },
    { new: true },
    (err, response) => {
      res.send(response);
    }
  );
});
