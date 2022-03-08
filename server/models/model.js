var fs = require("fs");
const path = require("path");
// const buffer = fs.readFileSync("../server/assets/posts.json");

class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.giphy = data.giphy;
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
  constructor(id, comment, emo1, emo2, emo3) {
    this.id = id;
    this.comment = comment;
    this.emo1 = emo1;
    this.emo2 = emo2;
    this.emo3 = emo3;
  }

  static create(data) {
    const newComment = new Comments(
      data.id,
      data.comment,
      data.emo1,
      data.emo2,
      data.emo3
    );
    return newComment;
  }
}

module.exports = { Post, Comments };
