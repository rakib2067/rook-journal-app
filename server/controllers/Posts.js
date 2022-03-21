const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    let posts = await Post.all;
    res.json(posts);
  } catch (error) {
    res.status(500).json({ err });
  }
});

router.post("/create", async (req, res) => {
  try {
    let postData = req.body;
    let post = await Post.create(postData);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error });
  }
});

// router.post("/comment", (req, res) => {
//   let post = loadPosts();
//   const data = req.body;
//   if (data.comment == "") {
//     res.status(404).send();
//   }

//   //create new storage of post comment
//   let position = post.findIndex((post) => data.id == post.id);
//   let obj = data.comment;
//   post[position].comment.push(obj);
//   fs.writeFileSync(pjf, JSON.stringify(post), "utf-8");
//   res.status(200).send(post[position]);
// });

router.patch("/emo", async (req, res) => {
  try {
    let postID = req.body.id;
    let post = await Post.findById(parseInt(postID));
    console.log("emo:", req.body.emo);
    let updatedPost = await post.update(req.body.emo);
    res.json({ post: updatedPost });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
