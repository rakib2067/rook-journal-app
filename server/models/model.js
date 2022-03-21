const mongoose = require("mongoose");
const validator = require("validator");

const Post = mongoose.model("Post", {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  giphy: {
    type: String,
    required: true,
    trim: true,
  },
  emo1: {
    type: Number,
    default: 0,
  },
  emo2: {
    type: Number,
    default: 0,
  },
  emo3: {
    type: Number,
    default: 0,
  },
  // comment: [{ type: Date, default: Date.now }, { type: String }],
  comment: [
    new mongoose.Schema({
      datetime: {
        type: Date,
        default: Date.now,
      },
      input: {
        type: String,
      },
    }),
  ],
});

module.exports = Post;
