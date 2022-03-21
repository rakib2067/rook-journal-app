const db = require("../dbConfig");

class Comment {
  constructor(data) {
    this.id = data.commentId;
    this.timeOfPost = data.timeOfPost;
    this.content = data.input;
    this.postID = data.postID;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const commentData = await db.query(`SELECT * FROM comment;`);
        const comments = commentData.rows.map((c) => new Comment(c));
        resolve(comments);
      } catch (error) {
        reject("Error Retrieving Comments");
      }
    });
  }

  static create({ datetime, input, id }) {
    return new Promise(async (resolve, reject) => {
      try {
        let commentData = await db.query(
          `INSERT INTO comment (datetime, input,postID) VALUES ($1,$2,$3) RETURNING *;`,
          [datetime, input, id]
        );
        let newComment = new Comment(commentData.rows[0]);
        resolve(newComment);
      } catch (error) {
        reject("Error creating the comment");
      }
    });
  }
}

module.exports = Comment;
