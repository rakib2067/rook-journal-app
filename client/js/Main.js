let title = document.querySelector(".post-title");
let description = document.querySelector(".post-description");
let gif = document.querySelector(".post-gif");
let submit = document.getElementById("submit-btn");
let form = document.querySelector(".create-post");
let gallery = document.querySelector(".gif--gallery");

description.addEventListener("keyup", getUserDescription);

title.addEventListener("keyup", getUserTitle);

gif.addEventListener("keyup", getUserGif);

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
      gallery.append(image);
    });
  });

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

form.addEventListener("submit", returnUserInput);

function returnUserInput(e) {
  e.preventDefault();
  console.log({
    userTitle,
    userDescription,
    userGif,
  });
}
