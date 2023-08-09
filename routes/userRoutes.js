const express = require("express");
const userRoutes = express.Router();
const User = require("../controllers/userController");

userRoutes.post("/register", User.register);

userRoutes.post("/login", User.login);

userRoutes.post("/logout", User.logOut);

module.exports = userRoutes;
