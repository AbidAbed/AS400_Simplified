const express = require("express");
const LoginValidator = require("../Validators/Users/Login");
const { Login } = require("../Controllers/Users/Login");
//---------- MAIN ROUTER

const UsersRouter = express.Router();
UsersRouter.post("/login", LoginValidator, Login);

module.exports = UsersRouter;
