const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Application started...");
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + ".index.html");
});


app.post("/", (req, res) => {
  console.log(req.body);
});