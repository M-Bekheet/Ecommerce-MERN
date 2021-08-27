const express = require("express");
const Product = require('../models/product.model')
const router = express.Router();


// Add Product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      seller,
      price,
      brand,
      image,
      category,
      description,
    } = req.body

    const pageSize = 12

    const product = new Product({
      name,
      seller,
      price,
      brand,
      image,
      category,
      description
    })
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;