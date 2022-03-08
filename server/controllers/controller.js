const express = require("express");
const router = express.Router();
const path = require("path");
const model = require("../models/model");
const pjf = path.resolve(__dirname, "../assets/post.json");
const cjf = path.resolve(__dirname, "../assets/comments.json");
const fs = require("fs");

router.get("/", (req, res) => {
  let posts = loadPosts();
  res.send(posts);
});

router.post("/create", (req, res) => {
  let posts = loadPosts();
  const data = req.body;
  const newData = model.Post.create(data);
  posts.push(newData);
  savePosts(posts);
  res.status(201).send(newData);
});

router.post("/comment", (req, res) => {
  let comment = loadComments();
  const data = req.body;
  const newData = model.Comments.create(data);
  comment.push(newData);
  fs.writeFileSync(cjf, JSON.stringify(comment), "utf-8");
  res.status(201).send(newData);
});

const savePosts = (posts) => {
  fs.writeFileSync(pjf, JSON.stringify(posts), "utf-8");
};

function loadPosts() {
  try {
    const buffer = fs.readFileSync(pjf, "utf-8");
    return JSON.parse(buffer);
  } catch (e) {
    return [];
  }
}
function loadComments() {
  try {
    const buffer = fs.readFileSync(cjf, "utf-8");
    return JSON.parse(buffer);
  } catch (e) {
    return [];
  }
}

module.exports = router;
