const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
global.fetch = require("jest-fetch-mock");

let mainApp;
describe("index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    mainApp = require("../js/Main.js");
  });

  describe("header", () => {
    describe("Add Post/Open Model Button", () => {
      let plusButton;
      let headerTitle;
      let cardTitle;
      let cardMain;
      let modalBg;
      let postTitle;
      let cardContainer;
      beforeEach(() => {
        // plusButton = document.querySelector("#add-post");
        modalBg = document.querySelector(".modal-bg");
        headerTitle = document.querySelector("#app-name");
        cardContainer = document.querySelector(".cards--container");
        postTitle = document.querySelector("#post-title");
      });

      //   test("it exists", () => {
      //     // expect(plusButton).toBeTruthy();
      //     expect(headerTitle).toBeTruthy();
      //     expect(cardContainer).toBeTruthy();
      //     expect(postTitle).toBeTruthy();
      //   });

      test("modal", () => {
        mainApp.closeModal();
        expect(modalBg.classList).toContain("bg-active");
      });
    });
  });
});
