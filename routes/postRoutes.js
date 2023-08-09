const express = require("express");
const postRoutes = express.Router();
const Post = require("../controllers/postController");

postRoutes.post("/", Post.create);

postRoutes.get("/", Post.getAll);

postRoutes.get("/:id", Post.getById);

postRoutes.post("/:id", Post.addComment);

module.exports = postRoutes;
