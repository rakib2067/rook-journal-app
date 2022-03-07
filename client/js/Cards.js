const commentForm = document.querySelector(".Comments-form");
const comments = document.getElementById("comment-area");
const combtn = document.getElementById("comment-btn");

combtn.addEventListener("click", postComment);

function postComment(e) {
  e.preventDefault();

  let input = comments.value;

  console.log(input);
}
