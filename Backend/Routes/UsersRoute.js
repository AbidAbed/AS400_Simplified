const express = require("express");

//---------- VALIDATORS

const loginValidator = require("../Validators/Users/Login");
const checkTokenValidator = require("../Validators/Users/checkToken");

//---------- CONTROLLERS

const login = require("../Controllers/Users/Login");
const checkToken = require("../Controllers/Users/CheckToken");

//---------- USERS ROUTER

const usersRouter = express.Router();
usersRouter.post("/login", loginValidator, login);
usersRouter.post("/checktoken", checkTokenValidator, checkToken);

module.exports = usersRouter;
