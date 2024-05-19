'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('invoiceItems', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'product_fk',
      references: {
        table: 'Products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('invoiceItems', 'product_fk')
  }
};
