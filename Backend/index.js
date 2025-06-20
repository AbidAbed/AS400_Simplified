//------------------------ Dependencies ------------------------------//

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./.env" });
const bodyparser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const UsersModel = require("./Models/Users");
const bcrypt = require("bcrypt");
const AuthoritiesModel = require("./Models/Authorities");
const MainRouter = require("./Routes/MainRouter");
const cors = require("cors");

//------------------------ Server Configurations ------------------------------//

const App = express();
//-------- FIRST THINGS FIRST CONNECT TO DB
mongoose
  .connect(process.env.DB_URL)
  .then((msg) => {
    //IF CONNECTED , THEN HOST
    App.listen(Number(process.env.PORT), process.env.HOST, (err) => {
      console.log(
        "[+] CONNECTED , RUNNING ON  " +
          process.env.HOST +
          ":" +
          process.env.PORT
      );
    });
  })
  .catch((err) => {
    //IF NOT , ERROR
    console.log("[-] ERROR ESTABLISHING CONNECTION TO DB");
    console.log("[-] " + err);
  });

//-------- ADDING CORS MIDDLEWARE
App.use(cors());

//-------- ADDING JSON PARSER MIDDLEWARE

App.use(bodyparser.urlencoded({ extended: false }));
App.use(bodyparser.json());

//-------- ADDING LOGGER MIDDLEWARE

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

App.use(morgan("combined", { stream: accessLogStream }));

App.use(morgan("dev"));

//-------- CREATE THE DEFAULT ROOT ADMIN

// 1- CREAT PRIVLAGE
AuthoritiesModel.create({
  authedUsers: [],
  name: "ROOT",
})
  .then((rslt) => {
    console.log("[+] ROOT AUTHORITY CREATED , ID : " + rslt.toObject()._id);

    // 2- CREATE ADMIN USER

    // 2.1- HASH PASSWORD

    bcrypt
      .hash(process.env.ROOT_ADMIN_USERNAME, Number(process.env.SALT_ROUNDS))
      .then((hashed_password) => {
        // 2.2- FIND THE ROOT AUTHORITY
        AuthoritiesModel.findOne({ name: "ROOT" })
          .then((foundAuthority) => {
            // 2.3- CREATE THE ROOT ADMING USER
            UsersModel.create({
              username: process.env.ROOT_ADMIN_USERNAME,
              password: hashed_password,
              authCodes: [foundAuthority._id],
            })
              .then((createdUser) => {
                console.log("[+] ROOT USER CREATED SUCCESSFULLY");

                foundAuthority
                  .updateOne({
                    $push: { authrizedUsers: createdUser._id },
                  })
                  .then((updatedAuthority) => {
                    console.log(
                      "[+] ROOT USER PUSHED TO ROOT AUTHORITY SUCCESSFULLY"
                    );
                  })
                  .catch((err) => {
                    console.log(
                      "[-] FAILED TO PUSH ROOT USER TO ROOT AUTHORITY SUCCESSFULLY"
                    );
                    console.log("[-] " + err);
                  });
              })
              .catch((err) => {
                console.log("[-] CAN'T CREATE ROOT ADMIN USER");
                console.log("[-] " + err);
              });
          })
          .catch((err) => {
            console.log("[-] CAN'T FIND ROOT AUTHORITY");
            console.log("[-] " + err);
          });
      });
  })
  .catch((err) => {
    console.log("[-] ERROR CREATING ROOT AUTHORITY");
    console.log("[-] " + err);
  });

//-------- ROUTER CONFIGURATIONS

App.use(MainRouter);
