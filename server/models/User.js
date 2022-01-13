const {DataTypes} = require("sequelize");
module.exports = function(sequelize, Sequelize) {

    return sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },

        username: {
            type: DataTypes.STRING,
            notEmpty: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        api_key: {
            type: DataTypes.STRING,
            notEmpty: true
        },

        secret_key: {
            type: DataTypes.STRING,
            notEmpty: true
        },

    });
}