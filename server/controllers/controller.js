const express = require("express");
const router = express.Router();

const Post = require("../models/model");

router.get("/", async (req, res) => {
  //load all the post
  try {
    const posts = await Post.find({});
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/create", async (req, res) => {
  const data = req.body;
  const post = new Post(data);
  try {
    let newPost = await post.save();
    res.status(201).send(newPost);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch("/comment", async (req, res) => {
  let id = req.body.id;
  const data = req.body;
  console.log(data, id);
  let datetime = data.datetime;
  let input = data.input;
  let newData = {
    comment: [{ input }],
  };

  try {
    let response = await Post.findByIdAndUpdate(
      id,
      { $push: newData },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/emo", async (req, res) => {
  let id = req.body.id;
  const data = req.body;
  let emo = data.emo;
  let emoToUpdate = {};
  emoToUpdate[emo] = 1;
  console.log(emoToUpdate);
  try {
    let response = await Post.findByIdAndUpdate(
      id,
      { $inc: emoToUpdate },
      { new: true }
    );
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
