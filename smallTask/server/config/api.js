const client = require("./connection.js");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.listen(4000, () => {
  console.log("Server has started at port 4000");
});

module.exports = app;
