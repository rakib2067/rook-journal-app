let APIKEY = "8PiyixOfCPFFExgTLW5347Y8xbuMoYGk";

fetch(
  "https://api.giphy.com/v1/gifs/trending?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&limit=25&rating=g"
)
  .then((res) => {
    res.json();
  })
  .then((data) => {
    console.log(data);
  });
