const db = require('../models');
const Order = db.order;

exports.getOrder = async(req, res) => {
    const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(400).send({
      message: `No order found with the id ${id}`,
    });
  }

  return res.send(order);
}

exports.createOrder = async(req, res) => {
    const { orderTotal } = req.body;
  
    if (!orderTotal) {
    return res.status(400).send({
      message: 'Please provide the orderTotal to create an Order!',
    });
  }

  try {
    let newOrder = await Order.create({
        orderTotal,
    });
    return res.send(newOrder);
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.updateOrder = async(req, res) => {
    const { orderTotal } = req.body;
    const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(400).send({
      message: `No order found with the id ${id}`,
    });
  }

  try {
    if (order) {
      order.orderTotal = orderTotal;
    }
    

    order.save();
    return res.send({
      message: `Order ${id} has been updated!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.deleteOrder = async(req, res) => {
    const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Please provide an id for the order you are trying to delete!',
    });
  }

  const order = await Order.findOne({
    where: {
      id,
    },
  });

  if (!order) {
    return res.status(400).send({
      message: `No order found with the id ${id}`,
    });
  }

  try {
    await order.destroy();
    return res.send({
      message: `Order ${id} has been deleted!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}