const express = require("express");

const userAuthenRouter = express.Router();
module.exports = userAuthenRouter;

//Databases
const User = require("./Collections/Users");

userAuthenRouter.get(
  "/makeNewAccount/:username/:password/:confirmPassword",
  (req, res) => {
    //Checks the length of submitted username and password
    if (req.params.username.length < 8) {
      res.send(
        "Your username must be at least 8 characters. Please try again."
      );
    } else if (req.params.password.length < 8) {
      res.send(
        "Your password must be at least 8 characters. Please try again."
      );
    } else {
      //Checks if the passwords match
      if (req.params.password == req.params.confirmPassword) {
        User.find({ username: req.params.username }, (err, users) => {
          if (users.length > 0) {
            res.send("Username has already been taken. Please try again.");
          } else {
            //Creates new user
            const newUser = new User({
              username: req.params.username,
              password: req.params.password,
            });
            newUser.save();
            res.send("Your account has been successfully created.");
          }
        });
      } else {
        res.send(
          "Your passwords do not match. Please confirm your password properly."
        );
      }
    }
  }
);

userAuthenRouter.get("/login/:username/:password", (req, res) => {
  //Checks username and password matches
  User.findOne({ username: req.params.username }, (err, user) => {
    if (user) {
      res.send("Login successful");
    } else {
      res.send("Login failed");
    }
  });
});
