const db = require('../models');
const Customer = db.customer;

exports.getCustomer = async(req, res) => {
    const { id } = req.params;

  const customer = await Customer.findOne({
    where: {
      id,
    },
  });

  if (!customer) {
    return res.status(400).send({
      message: `No customer found with the id ${id}`,
    });
  }

  return res.send(customer);
}

exports.createCustomer = async(req, res) => {
    const { fullName, password } = req.body;
  if (!fullName || !password) {
    return res.status(400).send({
      message: 'Please provide a fullName and a password to create a Customer!',
    });
  }

  let fullNameExists = await Customer.findOne({
    where: {
        fullName,
    },
  });

  if (fullNameExists) {
    return res.status(400).send({
      message: 'An account with that fullName already exists!',
    });
  }

  try {
    let newCustomer = await Customer.create({
        fullName,
      password,
    });
    return res.send(newCustomer);
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.updateCustomer = async(req, res) => {
    const { fullName, password } = req.body;
  const { id } = req.params;

  const customer = await Customer.findOne({
    where: {
      id,
    },
  });

  if (!customer) {
    return res.status(400).send({
      message: `No customer found with the id ${id}`,
    });
  }

  try {
    if (customer) {
      customer.fullName = fullName;
    }
    if (password) {
      customer.password = password;
    }

    customer.save();
    return res.send({
      message: `Customer ${id} has been updated!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}

exports.deleteCustomer = async(req, res) => {
    const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Please provide an id for the customer you are trying to delete!',
    });
  }

  const customer = await Customer.findOne({
    where: {
      id,
    },
  });

  if (!customer) {
    return res.status(400).send({
      message: `No customer found with the id ${id}`,
    });
  }

  try {
    await customer.destroy();
    return res.send({
      message: `Customer ${id} has been deleted!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
}