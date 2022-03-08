// //if (main.loaded === true) {
// let cardsList = document.querySelector("cards--container");
// const commentForm = document.querySelector(".Comments-form");
// const comments = document.getElementById("comment-area");
// const combtn = document.getElementById("comment-btn");

// // cardsList.addEventListener();

// commentForm.addEventListener("submit", postComment);

// function postComment(e) {
//   e.preventDefault();

//   let id = e.target.parentElement.parentElement.id;
//   let emojiContainer = e.target.parentElement.firstElementChild;
//   let emo1 = emojiContainer.firstElementChild;
//   let emo2 = emo1.nextElementSibling;
//   let emo3 = emo2.nextElementSibling;
//   let input = comments.value;
//   let data = {
//     id,
//     comment: input,
//     emo1,
//     emo2,
//     emo3,
//   };
//   console.log(JSON.stringify(data));
//   fetch("http://localhost:4000/comment", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
// //}
