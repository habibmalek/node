const express = require('express')
const router = express.Router()
const order = require('../controllers/order.controller');

router.get('/:id', order.getOrder)

router.post('/create', order.createOrder)

router.put('/update/:id', order.updateOrder)

router.post('/delete/:id', order.deleteOrder)

module.exports = router