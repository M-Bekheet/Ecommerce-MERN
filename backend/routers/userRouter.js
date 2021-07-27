const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const log = console.log;

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    username = username.toLowerCase();
    email = email.toLowerCase();
    password = await bcrypt.hash(password, 8);

    const foundUser = await User.findOne({ $or: [{ username }, { email }] });
    if (foundUser) {
      return res.status(400).send("User is already exist.");
    }

    const user = new User({ username, password, email });
    user.save();

    req.session.username = user.username;

    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.statusMessage(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username = "", email = "", password } = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase();

    const user = await User.findOne({ $or: [{ username }, { email }] });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Wrong Login Data");

    req.session.username = user.username;
    res.send(user);
  } catch (err) {
    console.log(chalk.red(err));
    res.status(400).send(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(chalk.red(err));
    res.status(500).send(err);
  }
});

module.exports = router;
