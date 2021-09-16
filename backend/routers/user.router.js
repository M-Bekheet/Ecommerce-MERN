const express = require("express");
const User = require("../models/user.model");
const {
  isAuth
} = require('../utils')
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const log = console.log;


/*
  TODOS: 
    - Sanitize sent login data so the password won't be included in it
*/


const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    let {
      username,
      email,
      password
    } = req.body;

    username = username.toLowerCase();
    email = email.toLowerCase();
    password = await bcrypt.hash(password, 8);

    const foundUser = await User.findOne({
      $or: [{
        username
      }, {
        email
      }]
    });
    if (foundUser) {
      return res.status(400).send("User is already exist.");
    }

    const user = new User({
      username,
      password,
      email
    });
    user.save();

    req.session.userID = user.id;


    return res.status(201).send(user);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post("/login", async (req, res) => {
  try {
    let {
      username = "", email = "", password = ''
    } = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase();

    const user = await User.findOne({
      $or: [{
        username
      }, {
        email
      }]
    });

    if (!user) return res.status(400).send()

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Wrong Login Data");

    req.session.userID = user.id;
    req.session.isAdmin = user.isAdmin;
    req.session.isSeller = user.isSeller;
    res.send(user);
  } catch (err) {
    console.log(chalk.red(err));
    res.status(400).send();
  }
});

//for testing purposes
router.get("/read", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    res.send(user)
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.send()
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send();
  }
});

module.exports = router;