const fs = require("fs");

exports.fileHandler = (file) => {
  let profileImagePath = null;
  if (file) {
    const { originalname, path } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    profileImagePath = path + "." + ext;
    fs.renameSync(path, profileImagePath);
  } else {
    profileImagePath = "uploads\\default\\default.png";
  }

  return profileImagePath;
};
