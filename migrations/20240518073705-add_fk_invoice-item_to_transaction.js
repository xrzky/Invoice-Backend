'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('invoiceItems', {
      fields: ['TransactionId'],
      type: 'foreign key',
      name: 'transaction_fk',
      references: {
        table: 'Transactions',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('invoiceItems', 'transaction_fk')
  }
};
