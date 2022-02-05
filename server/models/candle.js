const { Model } = require('sequelize');

class Candle extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },

                open: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                high: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                low: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                close: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                volume: {
                    type: DataTypes.DECIMAL,
                    allowNull: false,
                },

                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                tableName: 'candles',
                timestamps: false,
                sequelize,
            },
        );
    }

    static associate(models) {
        this.hasMany(models.Indicator, {
            foreignKey: 'id'
        });
    }
}

module.exports = Candle;
