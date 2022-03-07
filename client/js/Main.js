let title = document.querySelector(".post-title");
let description = document.querySelector(".post-description");
let gif = document.querySelector(".post-gif");
let submit = document.getElementById("submit-btn");
let form = document.querySelector(".create-post");

description.addEventListener("keyup", getUserDescription);

title.addEventListener("keyup", getUserTitle);

gif.addEventListener("keyup", getUserGif);

let userTitle = [];
let userDescription = [];
let userGif = [];

function getUserTitle(e) {
  userTitle = e.target.value;
  return userTitle;
}

function getUserDescription(e) {
  userDescription = e.target.value;
  return userDescription;
}

function getUserGif(e) {
  userGif = e.target.value;
  return userGif;
}

form.addEventListener("submit", returnUserInput);

function returnUserInput(e) {
  e.preventDefault();
  console.log(userTitle);
  console.log(userDescription);
  console.log(userGif);
}
