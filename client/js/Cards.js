let main = require("./Main");

//if (main.loaded === true) {
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
//}
