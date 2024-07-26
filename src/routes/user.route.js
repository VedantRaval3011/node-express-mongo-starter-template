const express = require("express");
const { getUserbyID } = require("../controllers/user.controller");


//Setting up the Express Router
const Router = express.Router();

//Public route
Router.get("/:id", getUserbyID);

module.exports = Router;
