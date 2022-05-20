const db = require("../dbConfig");


class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.giphy = data.giphy;
    this.emo1 = data.emo1 || 0;
    this.emo2 = data.emo2 || 0;
    this.emo3 = data.emo3 || 0;
    this.comment = [];
  }

  static create(userObject) {
    let count = 0;
    const pjf = path.resolve(__dirname, "../assets/post.json");
    let buffer = fs.readFileSync(pjf);
    try {
      // Checks for file is empty
      buffer = JSON.parse(buffer);
    } catch (e) {
      // If Empty
      // Create first entry
      let title = userObject.title;
      let content = userObject.content;
      let giphy = userObject.giphy;
      let emo1 = userObject.emo1;
      let emo2 = userObject.emo2;
      let emo3 = userObject.emo3;
      const newPost = new Post({
        id: 1,
        title,
        content,
        giphy,
        emo1,
        emo2,
        emo3,
      });

      return newPost;
    }
    // Create new Posts
    for (let obj of buffer) {
      count++;
    }
    count++;
    const newPost = new Post({ id: count, ...userObject });
    return newPost;
  }
}

module.exports = { Post };
