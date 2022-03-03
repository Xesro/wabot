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
                    allowNull: false,
                },

                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                apiKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                secretKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                tableName: 'users',
                timestamps: false,
                underscored: true,
                sequelize,
            },
        );
    }
}

module.exports = User;