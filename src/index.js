const express = require('express')
const sequelize = require('sequelize');
const { FORCE } = require('sequelize/types/index-hints');
const app = express()
const port = 3000

// Routes
app.use('/customer', require('./routes/customer'));
app.use('/order', require('./routes/order'));
app.use('/product', require('./routes/product'));




sequelize.sync({force:true})
.then(result => {
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})
.catch(err => {
  console.log(err)
})