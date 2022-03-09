const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Rook app listening on port ${port}`);
});

const gifController = require("./controllers/controller");
app.use("/", gifController);

module.exports = app;
