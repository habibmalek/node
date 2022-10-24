'use strict';
/** @type {import('sequelize-cli').Migration} */
const Customer = require('../models/customer');
const Product = require('../models/product');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderTotal: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customer',
          key: 'customerId',
      }},
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product',
          key: 'productId',
      }},
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};