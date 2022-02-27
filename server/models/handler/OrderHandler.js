const Order = require('../index').Order;
const EntityHandler = require('./EntityHandler')
const logger = require("../../logger/logger");

class OrderHandler extends EntityHandler{

    constructor() {
        super();
        this.entity = Order
    }

    updateStatus(id, status) {
        this.updateById(
            {status : status},
            id
        )
    }

    /**
     * @return id of the order in db
     */
    async createOrder({
                       strategyId,
                       currency,
                       username,
                       candleId,
                       leverage,
                       side,
                       type,
                       price,
                       stopPrice,
                       quantity,
                       status,
                       fees,
                       accountBalance,
                }
    ) {
        let order = await Order.create({
            strategyId: strategyId,
            currency: currency,
            username: username,
            candleId: candleId,
            leverage: leverage,
            side: side,
            type: type,
            price: price,
            stopPrice: stopPrice,
            quantity: quantity,
            status: status,
            fees: fees,
            accountBalance: accountBalance
        }).catch(function(error){
            logger.error("fail while persisting order in database :" , error)
        });

        return order.dataValues.id
    }

    updateStopOrder(orderId, price, gain, fees, accountBalance) {
         return this.updateById({
                price: price,
                gain : gain,
                fees: fees,
                accountBalance : accountBalance,
                status : Order.orderStatus.CLOSE
                },
            orderId
        )
    }

    updateCanceledLimitOrder(orderId, gain, accountBalance) {
        return this.updateById({
                gain : gain,
                accountBalance : accountBalance,
                status : Order.orderStatus.CANCEL
            },
            orderId
        )
    }
}

module.exports = OrderHandler
