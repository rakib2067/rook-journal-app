const request = require("supertest");
const app = require("../server.js");
// const Pdata = require("../assets/post.json");qq
const model = require("../models/model");

describe("server testing", () => {
  let testapp;
  let testPost = {
    id: 1,
    title: "Test",
    content: "Hello",
    giphy: "https://www.google.com/",
    emo1: 0,
    emo2: 0,
    emo3: 0,
  };
  let testComment = {
    id: 1,
    comment: "Test Comment",
  };
  let testComment2 = {
    id: 1,
    comment: "Test Comment2",
  };

  beforeAll(() => {
    testapp = app.listen(5000, () => {
      console.log(`running the test server`);
    });
  });

  afterAll(function (done) {
    console.log("stopping test server");
    testapp.close(done);
  });

  it("get all post", (done) => {
    request(testapp).get("/").expect(200, done);
  });

  it("get post comments by id res with 404(not exist)", (done) => {
    request(testapp).get("/comment/999").expect(404, done);
  });

  it("responds to post /create with status 201", (done) => {
    request(testapp)
      .post("/create")
      .send(testPost)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 1,
          title: "Test",
          content: "Hello",
          giphy: "https://www.google.com/",
          emo1: 0,
          emo2: 0,
          emo3: 0,
        },
        done
      );
  });

  it("responds to post /comment with status 201", (done) => {
    request(testapp)
      .post("/comment")
      .send(testComment)
      .set("Accept", "application/json")
      .expect(201)
      .expect(
        {
          id: 1,
          comment: { cmt1: "Test Comment" },
        },
        done
      );
  });
  it("responds to post /comment with status 200", (done) => {
    request(testapp)
      .post("/comment")
      .send(testComment2)
      .set("Accept", "application/json")
      .expect(200)
      .expect(
        {
          id: 1,
          comment: {
            cmt1: "Test Comment",
            cmt2: "Test Comment2",
          },
        },
        done
      );
  });

  it("get post comments by id res with 200(exist)", (done) => {
    request(testapp).get("/comment/1").expect(200, done);
  });
});
