const express = require("express");
const router = express.Router();
const model = require("./model/model.js");
var fs = require("fs");
const pjf = "post.json";
const cjf = "comments.json";

router.get("/", (req, res) => {
  res;
});

router.post("/create", (req, res) => {
  const data = req.body;
  const newData = model.post.create(data);
  var newPost = JSON.stringify(newData);

  fs.writeFile(pjf, newPost);
});

router.post("/comment", (req, res) => {
  const data = req.body;
  const newData = model.comments.create(data);
  var newComment = JSON.stringify(newData);

  fs.writeFile(cjf, newComment);
});
