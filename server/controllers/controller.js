const express = require("express");
const router = express.Router();
const path = require("path");
const model = require("../models/model");
const pjf = path.resolve(__dirname, "../assets/post.json");
const cjf = path.resolve(__dirname, "../assets/comments.json");
const fs = require("fs");

router.get("/", (req, res) => {
  let posts = loadPosts();
  res.status(200).send(posts);
});

router.post("/create", (req, res) => {
  try {
    let posts = loadPosts();
    const data = req.body;
    const newData = model.Post.create(data);
    posts.push(newData);
    savePosts(posts);
    res.status(201).send(newData);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/comment/:id", (req, res) => {
  let comments = loadComments();
  let specific = comments.filter((comment) => comment.id == req.params.id);
  if (specific.length === 0) {
    res.status(404).send();
  } else {
    res.status(200).send(specific);
  }
});

router.post("/comment", (req, res) => {
  let comments = loadComments();
  const data = req.body;
  //create new storage of post comment
  let query = comments.find((post) => data.id == post.id);
  console.log(query);
  if (!query) {
    console.log(data);
    const newData = model.Comments.create(data);
    comments.push(newData);
    fs.writeFileSync(cjf, JSON.stringify(comments), "utf-8");
    res.status(201).send(newData);
  } else {
    let l = query.comment.length;
    //let key = `cmt${(l + 1).toString()}`;
    let obj = data.comment;
    let position = comments.findIndex((post) => data.id == post.id);
    query.comment.push(obj);
    comments[position] = query;
    fs.writeFileSync(cjf, JSON.stringify(comments), "utf-8");
    res.status(200).send(comments[position]);
  }
});

function savePosts(posts) {
  fs.writeFileSync(pjf, JSON.stringify(posts), "utf-8");
}

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

router.post("/emo", (req, res) => {
  let posts = loadPosts();
  const data = req.body; //{id, emoji-id}
  let changed = posts.find((post) => data.id == post.id);
  console.log(changed);
  changed[data.emo] = parseInt(changed[data.emo] + 1);
  posts[data.id - 1] = changed;
  savePosts(posts);
  res.status(200).send(changed);
});

module.exports = router;
