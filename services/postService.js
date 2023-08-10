const {
  createPost,
  findAllPosts,
  findPostById,
  addCommentById,
} = require("../repository/postRepository");
const logger = require("../helpers/loggers");

exports.createNewPost = async (data) => {
  try {
    const newPost = await createPost(data);

    logger.info(`Post creation successfull`, "postService");
    return newPost;
  } catch (err) {
    logger.error(`Post creation failed. Error: ${err.message}`, "postService");
    return { success: false, data: { error: err.message } };
  }
};

exports.getAllPosts = async () => {
  try {
    const allPosts = await findAllPosts();

    logger.info(`Get all posts successfull`, "postService");
    return allPosts;
  } catch (err) {
    logger.error(`Get all posts failed. Error: ${err.message}`, "postService");
    return { success: false, data: { error: err.message } };
  }
};

exports.getPostById = async (data) => {
  try {
    const allPosts = await findPostById(data.id);

    logger.info(`Get post by id successfull`, "postService");
    return allPosts;
  } catch (err) {
    logger.error(`Get post by id failed. Error: ${err.message}`, "postService");
    return { success: false, data: { error: err.message } };

  }
};

exports.addComment = async (data) => {
  try {
    const allPosts = await addCommentById(data.id, data.comment, data.author);

    logger.info(`Adding comment successfull`, "postService");
    return allPosts;
  } catch (err) {
    logger.error(`Adding comment failed. Error: ${err.message}`, "postService");
    return { success: false, data: { error: err.message } };

  }
};
