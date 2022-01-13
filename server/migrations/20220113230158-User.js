'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) =>
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          defaultValue: false,
        },
        api_key: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        secret_key: {
          allowNull: false,
          type: DataTypes.STRING,
        },
      }),
  down: async (queryInterface /* , Sequelize */) =>
      queryInterface.dropTable('users'),

};
