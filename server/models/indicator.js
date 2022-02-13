const { Model } = require('sequelize');

class Indicator extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id : {
                type: DataTypes.DECIMAL,
                primaryKey: true,
                allowNull: false
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
        },
            {
                tableName: 'indicators',
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

module.exports = Indicator