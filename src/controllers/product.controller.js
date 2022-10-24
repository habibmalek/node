const db = require('../models');
const Order = db.order;

exports.getProduct = async(req, res) => {
    const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(400).send({
      message: `No product found with the id ${id}`,
    });
  }

  return res.send(product);
}

exports.createProduct = async(req, res) => {
    const { productName } = req.body;
  
    if (!productName) {
    return res.status(400).send({
      message: 'Please provide the productName to create a Product!',
    });
  }

  try {
    let newProduct = await Product.create({
        productName,
    });
    return res.send(newProduct);
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.updateProduct = async(req, res) => {
    const { productName } = req.body;
    const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(400).send({
      message: `No product found with the id ${id}`,
    });
  }

  try {
    if (product) {
      product.productName = productName;
    }
    

    product.save();
    return res.send({
      message: `Product ${id} has been updated!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.deleteProduct = async(req, res) => {
    const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Please provide an id for the product you are trying to delete!',
    });
  }

  const product = await Product.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(400).send({
      message: `No product found with the id ${id}`,
    });
  }

  try {
    await product.destroy();
    return res.send({
      message: `Product ${id} has been deleted!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}