const express = require("express");
const path = require("path");
const fileRoute = require("./routes/file");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://selenachen:Password@cluster0.r6qaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(fileRoute);

app.use("/files", express.static(__dirname + "/files"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const server = app.listen(5000, () => {
  console.log("server started on port 5000");
});

module.exports = server;
