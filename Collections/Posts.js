const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: String,
  subCheddar: String,
  title: String,
  image_video: String,
  bodyPost: String,
  postID: Number,
  upvotes: {
    type: Number,
    default: 0,
  },
  numberOfComments: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", PostSchema);
