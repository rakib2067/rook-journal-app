(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let main = require("./Main");

if (main.loaded === true) {
  let cardsList = document.querySelector("cards--container");

  const commentForm = document.querySelector(".Comments-form");
  const comments = document.getElementById("comment-area");
  const combtn = document.getElementById("comment-btn");

  cardsList.addEventListener();

  commentForm.addEventListener("submit", postComment);

  function postComment(e) {
    e.preventDefault();

    let input = comments.value;

    console.log(input);
  }
}

},{"./Main":2}],2:[function(require,module,exports){
let title = document.querySelector(".post-title");
let description = document.querySelector(".post-description");
let gif = document.querySelector("#post-gif");
let form = document.querySelector(".create-post");
let gallery = document.querySelector(".gifs");
let gif_search = document.querySelector("#gif-search");
let gif_reset = document.querySelector("#gif-reset");
let selectedGif;
description.addEventListener("keyup", getUserDescription);
title.addEventListener("keyup", getUserTitle);
gif.addEventListener("keyup", getUserGif);

window.addEventListener("load", initLoad);
let loaded = false;
function initLoad() {
  fetch("http://localhost:4000/")
    .then((res) => res.json())
    .then((data) => {
      for (post of data) {
        let id = data.id;
        let title = data.title;
        let gifs = data.giphy;
        let content = data.content;
      }
      try {
        let templateData = data;
        let template = Handlebars.compile(
          document.querySelector("#template--all").innerHTML
        );
        console.log(templateData);
        let filled = template(templateData);
        document.querySelector(".cards--container").innerHTML = filled;
        loaded = true;
      } catch (e) {
        alert(e);
      }
    });
}

getTrending();
function getTrending() {
  fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&limit=25&rating=g"
  )
    .then((res) => {
      return res.json();
    })
    .then(({ data }) => {
      data.forEach((gif) => {
        let image = document.createElement("img");
        image.src = gif.images["fixed_height_small"].url;
        image.classList.add("gif-image");
        gallery.append(image);
      });
      addGifHandlers();
    })
    .catch((error) => {
      alert("Error: ", error);
    });
}

let userObject = [];

function getUserTitle(e) {
  userTitle = e.target.value;
  return userObject.push(userTitle);
}

function getUserDescription(e) {
  userDescription = e.target.value;
  return userObject.push(userDescription);
}

function getUserGif(e) {
  userGif = e.target.value;
  return userObject.push(userGif);
}

gif_search.addEventListener("click", fetchGifs);

function fetchGifs() {
  gallery.innerHTML = "";
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&q=${userGif}&limit=25&offset=0&rating=g&lang=en`
  )
    .then((res) => {
      return res.json();
    })
    .then(({ data }) => {
      data.forEach((gif) => {
        let image = document.createElement("img");
        image.src = gif.images["fixed_height_small"].url;
        image.classList.add("gif-image");
        gallery.append(image);
      });
      addGifHandlers();
    })
    .catch((error) => {
      alert("Error: ", error);
    });
}

gif_reset.addEventListener("click", resetSearch);

function resetSearch() {
  gallery.innerHTML = "";
  getTrending();
  gif.value = "";
}

// Form Submit
form.addEventListener("submit", returnUserInput);

function returnUserInput(e) {
  e.preventDefault();
  if (!selectedGif) {
    return alert("Must Select a valid GIF");
  }
  let data = {
    title: userTitle,
    content: userDescription,
    giphy: selectedGif.src,
  };
  fetch("http://localhost:4000/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log("Error:", e);
      alert("Error: ", e);
    });
  // location.reload();
}

// Looping thorugh all gifs to handle selection

function addGifHandlers() {
  let selected = false;

  let gif_images = document.querySelectorAll(".gif-image");
  gif_images.forEach((gif) => {
    gif.addEventListener("click", () => {
      if (!selected) {
        selected = true;
        selectedGif = gif;
        selectedGif.style.border = "3px solid red";
      } else {
        selectedGif.style.border = "none";
        selectedGif = gif;
        selectedGif.style.border = "3px solid red";
      }
    });
  });
}

// module.exports = { userObject };
module.exports = { loaded };

},{}]},{},[1]);
