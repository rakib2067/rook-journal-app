let Giphy = require("./Giphy.js");

let title = document.querySelector(".post-title");
let description = document.querySelector(".post-description");

// Loading all the Cards from Backend
window.onload = initLoad;
function initLoad() {
  fetch("http://localhost:4000/")
    .then((res) => res.json())
    .then((data) => {
      try {
        let templateData = data;
        //
        // Getting Comment
        try {
          for (let post of templateData) {
            fetch(`http://localhost:4000/comment/${post.id}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                let test;
                test = data;
                if (data[0].comment) {
                  post["comments"] = data[0].comment;
                } else {
                  post = { comments: { cmt1: "No Comments" }, ...post };
                }
              });
          }
        } catch (e) {
          console.log("No Posts", e);
        }
        //
        setTimeout(() => {
          let template = Handlebars.compile(
            document.querySelector("#template--all").innerHTML
          );

          let filled = template(templateData);
          document.querySelector(".cards--container").innerHTML = filled;
          addCardHandler();
        }, 50);
      } catch (e) {
        console.log(e);
      }
    });
}

// Form Submit
let form = document.querySelector(".create-post");
form.addEventListener("submit", returnUserInput);

//store input
function returnUserInput(e) {
  e.preventDefault();
  let userTitle = title.value;
  let userDescription = description.value;
  console.log(Giphy);
  if (!Giphy.selectedGif) {
    return alert("Must Select a valid GIF");
  }
  let data = {
    title: userTitle,
    content: userDescription,
    giphy: Giphy.selectedGif.src,
    emo1: 0,
    emo2: 0,
    emo3: 0,
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

// Store comments
function addCardHandler() {
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    //Comment form
    let form = card.children[2].lastElementChild;
    form.addEventListener("submit", commentHandler);

    // Emoji Form
    let emojiCont = card.lastElementChild.firstElementChild.children;
    for (let emoji of emojiCont) {
      emoji.addEventListener("click", emoteHandler);
    }
  });
}

function emoteHandler(e) {
  let data = {
    id: e.target.parentElement.parentElement.parentElement.id,
    emo: e.target.id,
  };
  fetch("http://localhost:4000/emo", {
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
      alert(e);
    });
}

function commentHandler(e) {
  e.preventDefault();
  console.log(e);
  let id = e.target.parentElement.parentElement.id;
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " - " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  let input = e.target[0].value;
  let data = {
    id,
    comment: { datetime, input },
  };
  console.log(JSON.stringify(data));
  fetch("http://localhost:4000/comment", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Modal

let plus = document.querySelector("#add-post");
let bg = document.querySelector(".modal-bg");
let close = document.querySelector("#close");
plus.addEventListener("click", closeModal);

close.addEventListener("click", closeModal);

function closeModal() {
  bg.classList.toggle("bg-active");
}

module.exports = {
  initLoad,
  addCardHandler,
  emoteHandler,
  commentHandler,
  returnUserInput,
};
