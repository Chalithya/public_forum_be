const logger = require("../helpers/loggers");
const { registerUser, loginUser } = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    res.status(200).json(newUser);
  } catch (error) {
    logger.error(`User registration failed. Error: ${error.message}`, "userController");
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userDoc = await loginUser(req.body);

    if (!userDoc?.success) throw new Error(userDoc.data?.error);

    res.cookie("token", userDoc?.data?.token).status(200).json(userDoc);
  } catch (error) {
    logger.error(`User login failed. Error: ${error.message}`, "userController");
    res.status(401).json({ error: error.message });
  }
};

exports.logOut = (req, res) => {
  try {
    res.clearCookie("token").json("OK");
  } catch (error) {
    logger.error(`User logout failed. Error: ${error.message}`, "userController");
    res.status(500).json({ error: "An error occurred" });
  }
};
