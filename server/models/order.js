const { Model } = require('sequelize');

class Order extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.DECIMAL,
                },

                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                side: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                currency: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                price: {
                    type: DataTypes.DECIMAL,
                },

                quantity: {
                    type: DataTypes.DECIMAL,
                },

                stopPrice: {
                    type: DataTypes.DECIMAL,
                },

                strategyId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                status: {
                    type: DataTypes.ENUM("canceled", "executed"),
                    default: false
                }

            },
            {
                tableName: 'orders',
                underscored: true,
                timestamps: false,
                sequelize,
            },
        );
    }

    static associate(models) {
        this.belongsTo(models.Candle, {
            foreignKey: 'candle_id'
        });
    }
}

module.exports = Order;