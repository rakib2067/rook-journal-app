let gif = document.querySelector("#post-gif");
let gallery = document.querySelector(".gifs");
let gif_search = document.querySelector("#gif-search");
let gif_reset = document.querySelector("#gif-reset");
let selectedGif;

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
        console.log("selected: ", selectedGif);
        exports.selectedGif = selectedGif;
      } else {
        selectedGif.style.border = "none";
        selectedGif = gif;
        selectedGif.style.border = "3px solid red";
        exports.selectedGif = selectedGif;
      }
    });
  });
}
getTrending();

gif_search.addEventListener("click", fetchGifs);

gif_reset.addEventListener("click", resetSearch);

function resetSearch() {
  gallery.innerHTML = "";
  getTrending();
  gif.value = "";
}

exports.test = { getTrending, fetchGifs, resetSearch };
