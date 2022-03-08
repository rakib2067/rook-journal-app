let title = document.querySelector(".post-title");
let description = document.querySelector(".post-description");

// Loading all the Cards from Backend
window.onload = initLoad;

let loaded = false;
function initLoad() {
  fetch("http://localhost:4000/")
    .then((res) => res.json())
    .then((data) => {
      try {
        let templateData = data;
        //
        //
        //
        //
        // Getting Comment
        try {
          for (let post of templateData) {
            fetch(`http://localhost:4000/comment/${post.id}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
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
        console.log(templateData);

        //
        //
        //
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
        alert(e);
      }
    });
}

// GIPHY API

let gif = document.querySelector("#post-gif");
let gallery = document.querySelector(".gifs");
let gif_search = document.querySelector("#gif-search");
let gif_reset = document.querySelector("#gif-reset");
let selectedGif;
getTrending();
function getTrending() {
  fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&limit=45&rating=g"
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

gif_search.addEventListener("click", fetchGifs);

function fetchGifs() {
  let userGif = gif.value;
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

// Form Submit
let form = document.querySelector(".create-post");

form.addEventListener("submit", returnUserInput);

//store input
function returnUserInput(e) {
  e.preventDefault();
  let userTitle = title.value;
  let userDescription = description.value;
  if (!selectedGif) {
    return alert("Must Select a valid GIF");
  }
  let data = {
    title: userTitle,
    content: userDescription,
    giphy: selectedGif.src,
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
      let data = {
        id: card.id,
        emo: emoji.id,
      };
      emoji.addEventListener("click", () => {
        //{id, emo1, emo2, emo3}
        console.log("Emoji: ", emoji, emoji.textContent);
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
      });
    }
  });
}

function commentHandler(e) {
  e.preventDefault();
  console.log(e);
  let id = e.target.parentElement.parentElement.id;
  let emojiContainer = e.target.parentElement.firstElementChild;

  let input = e.target[0].value;
  let data = {
    id,
    comment: input,
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
