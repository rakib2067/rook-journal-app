const express = require("express");
const router = express.Router();
const path = require("path");
const model = require("../models/model");
const pjf = path.resolve(__dirname, "../assets/post.json");
const cjf = path.resolve(__dirname, "../assets/comments.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/create", (req, res) => {
  let posts = loadPosts();
  console.log("Posts", posts);
  const data = req.body;
  const newData = model.Post.create(data);
  console.log(newData);
  posts.push(newData);
  savePosts(posts);
  res.status(201).send(newData);
});

router.post("/comment", (req, res) => {
  const data = req.body;
  const newData = model.Comments.create(data);
  var newComment = JSON.stringify(newData);
  fs.writeFile(cjf, newComment);
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

module.exports = router;
