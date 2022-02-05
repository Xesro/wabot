'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.createTable('indicators', {
        candle_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'candles',
            key: 'id',
          }
        },

        currency: {
          type: DataTypes.STRING,
          allowNull: false
        },

        date: {
          type: DataTypes.DATE,
          allowNull: false
        },

        data: {
          type: DataTypes.JSON,
          allowNull: false,
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('indicators')
  }
};
