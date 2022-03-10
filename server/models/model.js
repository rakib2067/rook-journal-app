var fs = require("fs");
const path = require("path");
// const buffer = fs.readFileSync("../server/assets/posts.json");

class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.giphy = data.giphy;
    this.emo1 = data.emo1 || 0;
    this.emo2 = data.emo2 || 0;
    this.emo3 = data.emo3 || 0;
  }

  static create(userObject) {
    let count = 0;
    const pjf = path.resolve(__dirname, "../assets/post.json");
    let buffer = fs.readFileSync(pjf);
    try {
      buffer = JSON.parse(buffer);
    } catch (e) {
      const newPost = new Post({ id: 1, ...userObject });
      return newPost;
    }
    for (let obj of buffer) {
      count++;
    }
    count++;
    const newPost = new Post({ id: count, ...userObject });
    return newPost;
  }
}

class Comments {
  constructor(id, comment) {
    this.id = id;
    this.comment = [comment];
  }
  // [{"id":"2","comment":[{"cmt":{"time":"test time","input":"Testing"}}]}]
  static create(data) {
    const newComment = new Comments(data.id, data.comment);
    return newComment;
  }
}

module.exports = { Post, Comments };
