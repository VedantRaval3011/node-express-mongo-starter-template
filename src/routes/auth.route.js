const express = require("express");
const { register, login } = require("../controllers/auth.controller");

//Setting up the Express Router
const Router = express.Router();

//Setting up Routes
Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
