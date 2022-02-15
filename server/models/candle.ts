import {Model,InferAttributes,InferCreationAttributes} from 'sequelize';
import Sequelize from '.';
const time_frames = { ONE_M: "1m", FIVE_M: "5m", FIFTEEN_M: "15m" }
export default class Candle extends Model<InferAttributes<Candle>, InferCreationAttributes<Candle>> {
    static init(sequelize, DataTypes) {
        return super.init({
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                currency: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                time_frame: {
                    type: DataTypes.ENUM,
                    values: Object.values(time_frames),
                    allowNull: false,
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
