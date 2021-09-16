const express = require("express");
const Product = require('../models/product.model')
const fakeProducts = require('../fake-products.json');
const {
  isAuth,
  isAdmin
} = require("../utils");
const router = express.Router();

// Add Product
router.post("/", isAuth, async (req, res) => {
  try {
    let {
      title,
      seller,
      price,
      brand,
      image,
      category,
      description,
      countInStock
    } = req.body

    const pageSize = 12
    if (!seller) {
      seller = req.session.userID
    }
    const product = new Product({
      title,
      seller,
      price,
      brand,
      image,
      category,
      description,
      countInStock
    })
    product.save()
    res.send(product)
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
});


// Get Products
router.get('/', async (req, res) => {
  try {
    const {
      page = 5,
        pageSize = 3,
        seller,
        category,
        brand,
        minPrice,
        maxPrice,
        title,
        rating
    } = req.body

    const sellerFilter = seller ? {
      seller
    } : {}
    const categoryFilter = category ? {
      category
    } : {}
    const brandFilter = brand ? {
      brand
    } : {}
    const priceFilter = (minPrice && maxPrice) ? {
      price: {
        $lte: maxPrice,
        $gte: minPrice
      }
    } : {}
    const titleFilter = title ? {
      title: {
        $regex: title,
        $options: 'i'
      }
    } : {}
    const ratingFilter = rating ? {
      rating: {
        $gte: rating
      }
    } : {}

    const products = await Product.find({
        ...sellerFilter,
        ...categoryFilter,
        ...brandFilter,
        ...priceFilter,
        ...titleFilter,
        ...ratingFilter
      })
      .skip((page - 1) * (pageSize))
      .limit(pageSize)

    const count = await Product.countDocuments({
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...titleFilter,
      ...ratingFilter
    })

    res.send({
      products,
      page,
      pages: Math.ceil(count / pageSize)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
})


//Delete Product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({
      _id: req.params.id
    })
    res.send({
      msg: 'Product Deleted',
      product: deletedProduct
    })
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
});


// Seed Fake Products
router.get("/seed", isAuth, async (req, res) => {
  try {
    const seller = req.session.userID;
    const products = fakeProducts
    products.forEach((prod, i) => {
      products[i].seller = seller
      products[i].countInStock = products[i].rating.count
    })

    const addedProducts = await Product.insertMany(products)

    res.send(addedProducts)

  } catch (err) {
    console.log(err)

    res.status(500).send();
  }
});



module.exports = router;