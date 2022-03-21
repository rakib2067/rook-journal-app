const express = require("express");
const router = express.Router();
const path = require("path");
const model = require("../models/Post");
const pjf = path.resolve(__dirname, "../assets/post.json");
const fs = require("fs");

router.get("/", (req, res) => {
  //load all the post
  let posts = loadPosts();
  res.status(200).send(posts);
});

router.post("/create", (req, res) => {
  try {
    //load all post
    let posts = loadPosts();
    const data = req.body;
    //create data as obj
    const newData = model.Post.create(data);
    //add new data into all data
    posts.push(newData);
    //save the data
    savePosts(posts);
    res.status(201).send(newData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/comment", (req, res) => {
  let post = loadPosts();
  const data = req.body;
  if (data.comment == "") {
    res.status(404).send();
  }

  //create new storage of post comment
  let position = post.findIndex((post) => data.id == post.id);
  let obj = data.comment;
  post[position].comment.push(obj);
  fs.writeFileSync(pjf, JSON.stringify(post), "utf-8");
  res.status(200).send(post[position]);
});

function savePosts(posts) {
  // Writes updated data to the json file
  fs.writeFileSync(pjf, JSON.stringify(posts), "utf-8");
}

function loadPosts() {
  try {
    // Reads Json file if empty adds a square bracket, otherwise returns JSON
    const buffer = fs.readFileSync(pjf, "utf-8");
    return JSON.parse(buffer);
  } catch (e) {
    return [];
  }
}

router.post("/emo", (req, res) => {
  let posts = loadPosts();
  const data = req.body; //{id, emoji-id}
  let changed = posts.find((post) => data.id == post.id);
  changed[data.emo] = parseInt(changed[data.emo] + 1);
  posts[data.id - 1] = changed;
  savePosts(posts);
  res.status(200).send(changed);
});

module.exports = router;
