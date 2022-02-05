'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('candles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },

        open: {
          type: DataTypes.DOUBLE,
          notEmpty: true
        },

        high: {
          type: DataTypes.DOUBLE,
          notEmpty: true
        },

        low: {
          type: DataTypes.DOUBLE,
          notEmpty: true
        },

        close: {
          type: DataTypes.DOUBLE,
          notEmpty: true
        },

        volume: {
          type: DataTypes.DOUBLE,
          notEmpty: true
        },

        date: {
          type: DataTypes.DATE,
          notEmpty: true
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('candles')
  }

};
