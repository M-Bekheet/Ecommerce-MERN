const express = require("express");
const Order = require("../models/order.model");
const Product = require("../models/order.model");
const {
    isAuth
} = require('../utils')
const chalk = require("chalk");


const router = express.Router();

/*
     To DOs:
    - Add PUT endpoint for updating payment method
    - Add PUT endpoint for updating delivery status
*/

// Add order
router.post('/', isAuth, async (req, res) => {
    try {
        const order = {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            isPaid,
            paidAt,
            isDelivered,
            deliveredAt,
            seller,
            product
        } = req.body

        order.user = req.session.userID;

        if (!orderItems.length) throw new Error('Order Items are required.')

        const createdOrder = new Order(order);
        await createdOrder.save()
        res.status(201).send(createdOrder)

    } catch (err) {
        console.log(chalk.red('Order Endpoint Error'));
        console.log(chalk.red(err));
        res.status(400).send()
    }
})



// Get Orders
router.get('/', isAuth, async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.session.userID
        })

        console.log(orders)
        if (!orders.length) throw new Error('No Orders found.')

        res.send(orders)

    } catch (err) {
        console.log(chalk.red('Order Endpoint Error'));
        console.log(chalk.red(err));
        res.status(400).send()
    }
})


// Delete Order
router.delete('/:id', isAuth, async (req, res) => {
    try {

        const deletedOrder = await Order.findByIdAndDelete(req.params.id)

        if (!deletedOrder) throw new Error('No Order Found')
        res.send(deletedOrder)

    } catch (err) {
        console.log(chalk.red('Order Endpoint Error'));
        console.log(chalk.red(err));
        res.status(400).send()
    }
})



module.exports = router