'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Transaction)
      this.belongsTo(models.Product)
    }
  }
  invoiceItem.init({
    TransactionId: {
      type: DataTypes.UUID
    },
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {  
        isInt: { 
          msg: "checks for valid integers"
        }, 
        notNull: {
          msg: "quantity cannot be null/ omitted"
        },
        notEmpty: {
          msg: "quantity cannot be an emty string"
        }
      } 
    }
  }, {
    sequelize,
    modelName: 'invoiceItem',
  });
  return invoiceItem;
};