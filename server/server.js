const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
require("./db/mongoose");
// Linking to mongoose file starts the database

app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Rook app listening on port ${port}`);
});

const gifController = require("./controllers/controller");

app.use("/", gifController);

module.exports = app;
