const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("No Products Yet");
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
