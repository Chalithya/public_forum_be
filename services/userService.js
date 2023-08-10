const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sillyname = require('sillyname');
const { createUser, findUser } = require("../repository/userRepository");
const { passwordEncrypter } = require("../helpers/user.helper");
const { SECRET_KEY } = require("../config/config");
const logger = require("../helpers/loggers");

exports.registerUser = async (data) => {
  try {
    const { username, password, email } = data;
    if (!username || !password)
      throw new Error("Username and password are required");

    const hashedPassword = await passwordEncrypter(password);

    const hashedUser = { ...data, password: hashedPassword };
    const newUser = await createUser(hashedUser);

    logger.info(`User created. username: ${username}`, "userService");
    return newUser;
  } catch (err) {
    logger.error(`Error creating user. Error: ${err.message}`, "userService");
    return { success: false, data: { error: err.message } };
  }
};

exports.loginUser = async (data) => {
  try {
    const { username, password } = data;

    if (!username || !password)
      throw new Error("Username and password are required");

    const newUser = await findUser(username);
    if(!newUser.success) throw new Error(newUser.data?.error);

    const passwordMatch = await bcrypt.compare(password, newUser?.data?.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const funnyName = sillyname();
    const token = jwt.sign({ username, id: newUser?.data?._id, nickname: funnyName }, SECRET_KEY, {});

    newUser.data.token = token;
    newUser.nickname = funnyName;

    logger.info(`User logged in. username: ${username}`, "userService");
    return newUser;
  } catch (err) {
    logger.error(`Error finding user. Error: ${err.message}`, "userService");
    return { success: false, data: { error: err.message } };
  }
};
