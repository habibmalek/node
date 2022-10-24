const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller');

router.get('/:id', product.getProduct)

router.post('/create', product.createProduct)

router.put('/update/:id', product.updateProduct)

router.post('/delete/:id', product.deleteProduct)

module.exports = router