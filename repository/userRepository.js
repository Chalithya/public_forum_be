const User = require("../models/User");
const logger = require("../helpers/loggers");

exports.createUser = async (data) => {
  try {
    const userDoc = await User.create(data);

    logger.info(`User created. username: ${userDoc.username}`,"userRepository");
    return { success: true, data: userDoc };
  } catch (err) {
    logger.error(`Error creating user. Error: ${err.message}`,"userRepository");
    return { success: false, data: { error: err.message } };
  }
};

exports.findUser = async (username) => {
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) throw new Error("User not found");

    logger.info(`User found. username: ${username}`, "userRepository");
    return { success: true, data: userDoc };
  } catch (err) {
    logger.error(`Error finding user. Error: ${err.message}`, "userRepository");
    return { success: false, data: { error: err.message } };
  }
};
