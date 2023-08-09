const bcrypt = require("bcryptjs");

exports.passwordEncrypter = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
