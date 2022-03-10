const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");

let app;
let mainApp;

describe("Testing App Functionality", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    app = require("../js/Giphy.js");
    mainApp = require("../js/Main.js");
  });

  afterEach(() => {
    fetch.resetMocks();
  });
  describe("Giphy API", () => {
    test("Fetch from API", () => {
      app.test.getTrending();
      expect(fetch.mock.calls[0][0]).toMatch(
        /https:\/\/api.giphy.com\/v1\/gifs\/trending\?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&limit=45&rating=g/
      );
    });
    test("Fetch Specific from the API", () => {
      app.test.fetchGifs();
      expect(fetch.mock.calls[0][0]).toMatch(
        /https:\/\/api.giphy.com\/v1\/gifs\/search\?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&q=&limit=25&offset=0&rating=g&lang=en/
      );
    });
    test("Reset Search", () => {
      app.test.resetSearch();
      expect(fetch.mock.calls[0][0]).toMatch(
        /https:\/\/api.giphy.com\/v1\/gifs\/trending\?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&limit=45&rating=g/
      );
    });
  });
});
