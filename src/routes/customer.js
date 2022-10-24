const express = require('express')
const router = express.Router()
const customer = require('../controllers/customer.controller');

router.get('/:id', customer.getCustomer)

router.post('/create', customer.createCustomer)

router.put('/update/:id', customer.updateCustomer)

router.post('/delete/:id', customer.deleteCustomer)

module.exports = router