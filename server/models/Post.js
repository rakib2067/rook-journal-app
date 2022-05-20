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
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const postData = await db.query(`SELECT * FROM post;`);
        const posts = postData.rows.map((p) => new Post(p));
        resolve(posts);
      } catch (error) {
        reject("Error Retrieving Posts");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(`SELECT * from post WHERE postID=$1;`, [
          id,
        ]);
        let post = new Post(postData.rows[0]);
        resolve(post);
      } catch (error) {
        reject("Post not Found");
      }
    });
  }

  static create({ title, content, giphy }) {
    return new Promise(async (resolve, reject) => {
      try {
        let postData = await db.query(
          `INSERT INTO post (title, content,giphy) VALUES ($1,$2,$3) RETURNING *;`,
          [title, content, giphy]
        );
        let newPost = new Post(postData.rows[0]);
        resolve(newPost);
      } catch (error) {
        reject("Error creating the post");
      }
    });
  }

  update(emo) {
    return new Promise(async (resolve, reject) => {
      try {
        let updatedPostData = await db.query(
          `UPDATE post SET $1 = q$1+1 WHERE postID=$2 RETURNING *;`,
          [emo, this.id]
        );
        let updatedPost = new Post(updatedPostData.rows)[0];
        resolve(updatedPost);
      } catch (error) {
        reject("Error updating Post");
      }
    });
  }
}

module.exports = Post;
