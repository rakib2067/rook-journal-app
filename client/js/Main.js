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
  console.log({
    userTitle,
    userDescription,
    gifURL: selectedGif.src,
  });
  location.reload();
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
