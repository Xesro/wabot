const { Model } = require('sequelize');

class Order extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
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
                    allowNull: true,
                    default: null
                },

                quantity: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                stopPrice: {
                    type: DataTypes.DECIMAL,
                    default: null
                },

                leverage: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                strategyId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },

                status: {
                    type: DataTypes.ENUM(this.orderStatus.CANCEL, this.orderStatus.CLOSE, this.orderStatus.OPEN),
                    allowNull: false,
                },

                gain: {
                    type: DataTypes.DECIMAL,
                    default: null
                },

                fees: {
                    type: DataTypes.DECIMAL,
                    default: null
                },

                accountBalance: {
                    type: DataTypes.DECIMAL,
                    default: null
                },


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

    static orderStatus = {
        CANCEL: "cancel",
        OPEN: "open",
        CLOSE: "close"
    }
}

module.exports = Order