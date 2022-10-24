'use strict';
const {Model} = require('sequelize');
const Customer = require('./customer');
const Product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        as: 'customers',
        foreignKey: 'customerId',
        targetKey: 'customerId'
     });
      Order.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'productId',
        targetKey: 'productId'});
    }
  }
  Order.init({
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    orderTotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    tableName: 'orders',
    modelName: 'Order',
  });
  return Order;
};
