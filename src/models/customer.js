'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Customer.init({
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    tableName: 'customers',
    modelName: 'Customer',
  });
  return Customer;
};
