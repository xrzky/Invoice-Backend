'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title product cannot be null'
        },
        notEmpty: {
          msg: 'tittle cannot be an empty string'
        }
      }
    }, 
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: -1,
          msg: 'price cannot be under 0'
        },
        notNull: {
          msg: 'price product cannot be null'
        },
        notEmpty: {
          msg: 'price product cannot be an empty'
        },
        isInt: {
          msg: 'price must be an integer'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};