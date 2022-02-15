const { Model } = require('sequelize');

export default class User extends Model {
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

                api_key: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                secret_key: {
                    type: DataTypes.STRING,
                    allowNull: false,
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
