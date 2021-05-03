const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("../models/file");
const Router = express.Router();
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("only upload files with jpg, jpeg, png format."));
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get("/uploads", async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of uploads. Try again later.");
  }
});

Router.get("/uploads/:id", async (req, res) => {
  try {
    File.findById(req.params.id).exec(function (err, file) {
      if (err) {
        res
          .status(400)
          .send("Error while getting this image. Try again later.");
      }
      res.send(file);
    });
  } catch (error) {
    res.status(400).send("Error while getting this image. Try again later.");
  }
});

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.delete("/uploads/:id", (req, res) => {
  try {
    File.findByIdAndRemove(req.params.id, function (err, deletedFile) {
      if (err) {
        res.status(400).send("Error while deleting image. Try again later.");
      }
      if (fs.existsSync("./" + deletedFile.file_path)) {
        fs.unlinkSync("./" + deletedFile.file_path);
      }
      res.send(deletedFile);
    });
  } catch (error) {
    res.status(400).send("Error while deleting file. Try again later.");
  }
});

module.exports = Router;
