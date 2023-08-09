const express = require("express");
const multer = require("multer");
const postRoutes = express.Router();
const Post = require("../controllers/postController");
const uploadMiddleware = multer({ dest: "uploads/" });

postRoutes.post("/", uploadMiddleware.single("image"), Post.create);

postRoutes.get("/", Post.getAll);

postRoutes.get("/:id", Post.getById);

postRoutes.post("/:id", Post.addComment);

module.exports = postRoutes;
