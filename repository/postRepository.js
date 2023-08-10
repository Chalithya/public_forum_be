const Post = require("../models/Post");
const logger = require("../helpers/loggers");

exports.createPost = async (data) => {
  try {
    const postDoc = await Post.create(data);

    logger.info(`Post creation successfull`, "postRepository");
    return { success: true, data: postDoc };
  } catch (err) {
    logger.error(
      `Post creation failed. Error: ${err.message}`,
      "postRepository"
    );
    return { success: false, data: { error: err.message } };
  }
};

exports.findAllPosts = async () => {
  try {
    const postDoc = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    logger.info(`Get all Posts successfull`, "postRepository");
    return { success: true, data: postDoc };
  } catch (err) {
    logger.error(
      `Get all Posts failed. Error ${err.message}`,
      "postRepository"
    );
    return { success: false, data: { error: err.message } };
  }
};

exports.findPostById = async (id) => {
  try {
    const postDoc = await Post.findById(id)
      .populate("author", ["username"])
      .populate("comments.author", ["username"]);
    if (!postDoc) throw new Error("Post not found");

    logger.info(`Get post by id successfull`, "postRepository");
    return { success: true, data: postDoc };
  } catch (err) {
    logger.error(
      `Get post by id failed. Error ${err.message}`,
      "postRepository"
    );
    return { success: false, data: { error: err.message } };
  }
};

exports.addCommentById = async (id, comment, authorId) => {
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);

    if (!postDoc) throw new Error("Post not found");

    const newComment = {
      message: comment,
      author: authorId,
    };
    postDoc.comments.push(newComment);

    await postDoc.save();

    logger.info(`Adding comment successfully`, "postRepository");
    return { success: true, data: postDoc };
  } catch (err) {
    logger.error(
      `Adding comment failed. Error: ${err.message}`,
      "postRepository"
    );
    return { success: false, data: { error: err.message } };
  }
};
