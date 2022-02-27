const {Order} = require("../models");
const logger = require("../logger/logger");
const EventEmitter = require("events");

/**
 * @description Event name
 */
const NEW_ORDER = "newOrder";

const limitOrderTimeout = 450000;

/** @abstract */
class AbstractClient {

    strategyId = null
    currency = null
    user = null

    constructor(orderHandler) {
        this.eventEmitter = new EventEmitter()
        this.orderHandler = orderHandler;
    }

    emitNewOrder({
                     type,
                     side,
                     price,
                     quantity,
                     stopPrice,}
    )
    {
        let newOrder = Order.build({
            strategyId: this.strategyId,
            currency: this.user.currency,
            username: this.user.username,
            side: side,
            type: type,
            price: price,
            stopPrice: stopPrice,
            quantity: quantity
        })

        this.eventEmitter.emit(NEW_ORDER, newOrder)
    }

    async isFullyExecuted(response) {
        let fullyExecuted = new Promise( (resolve, reject) => {
            setTimeout( async () => {
                    let orderStatus = await this.getOrderStatus(response.orderId)
                    resolve(orderStatus)
                },
                limitOrderTimeout
            )
        })

        if (await fullyExecuted === false) {
            logger.info("limit order not fully executed, all order will be canceled", response, this.strategyId)
            await this.cancelAllOrders()
            this.orderHandler.updateStatus()
        }

        return fullyExecuted;
    }

    /** @abstract */
    async limitBuy(quantity, price) {}

    /** @abstract */
    async limitSell(quantity, price) {}

    /** @abstract */
    async marketBuy(quantity) {}

    /** @abstract */
    async marketSell(quantity) {}

    /** @abstract */
    async setShortStopLoss(quantity, stopPrice) {}

    /** @abstract */
    async setLongStopLoss(quantity, stopPrice) {}

    /** @abstract */
    async setLongTakeProfit(quantity, price, type) {}

    /** @abstract */
    async setShortTakeProfit(quantity, price, type) {}

    /** @abstract */
    async getPositions() {}

    /** @abstract */
    async setLeverage(leverage) {}

    /** @abstract */
    async cancelAllOrders() {}

    /** @abstract */
    async getOrderStatus(orderId) {}
}

module.exports = AbstractClient