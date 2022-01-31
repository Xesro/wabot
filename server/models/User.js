const { Model } = require('sequelize');

class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
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
            },
            {
                tableName: 'users',
                timestamps: false,
                sequelize,
            },
        );
    }
}

module.exports = User;