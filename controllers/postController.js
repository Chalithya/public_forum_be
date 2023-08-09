const jwt = require("jsonwebtoken");
const {
  createNewPost,
  getAllPosts,
  getPostById,
  addComment,
} = require("../services/postService");
const { SECRET_KEY } = require("../config/config");
const logger = require("../helpers/loggers");

exports.create = async (req, res) => {
  try {
    const { token } = req.cookies;
    const info = jwt.verify(token, SECRET_KEY);
    req.body.author = info.id;

    const postDoc = await createNewPost(req.body);

    res.status(200).json(postDoc);
  } catch (error) {
    logger.error(`Create post failed. Error: ${error.message}`, "postController");
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json(posts);
  } catch (error) {
    logger.error(`Get all posts failed. Error: ${error.message}`, "postController");
    res.status(500).json({ error: error.message });
 }
};

exports.getById = async (req, res) => {
  try {
    const postDoc = await getPostById(req.params);

    res.status(200).json(postDoc);
  } catch (error) {
    logger.error(`Get post by id failed. Error: ${error.message}`, "postController");
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { token } = req.cookies;
    const info = jwt.verify(token, SECRET_KEY);
    req.body.author = info.id;
    req.body.id = req.params.id;

    const postDoc = await addComment(req.body);

    res.status(200).json(postDoc);
  } catch (error) {
    logger.error(`Adding comment failed. Error: ${error.message}`, "postController");
    res.status(500).json({ error: error.message });
  }
};
