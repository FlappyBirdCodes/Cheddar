const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  postID: Number,
  commentID: Number,
  commenter: String,
  comment: String,
  time: String,
  upvotes: Number,
  upvoters: {
    type: Array,
    default: [],
  },
  upvoteStatus: {
    type: String,
    default: "Upvote",
  },
});

module.exports = mongoose.model("Comment", CommentsSchema);
