const express = require("express");
const Order = require("../models/order.model");

const chalk = require("chalk");
const log = console.log;


const router = express.Router();

router.get('/', (req, res) => {
    try {

    } catch (err) {
        console.log(chalk.red('Order Endpoint Error'));
        console.log(chalk.red(err));

    }
})

module.exports = router