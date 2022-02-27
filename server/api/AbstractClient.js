const {Order} = require("../models");
const logger = require("../logger/logger");
const EventEmitter = require("events");
const Binance = require("node-binance-api");
const order = require('../models').Order

/**
 * @description Event name
 */
const NEW_ORDER = "new_order";
const STOP_ORDER_TRIGGERED = "stop_order_triggered"

const limitOrderTimeout = 45000;
const watchOrderInterval = 50000

/** @abstract */
class AbstractClient {

    strategyId = null
    currency = null
    user = null
    candleId = null
    leverage = null
    limitFees = 0
    marketFees = 0

    constructor(orderHandler, profitCalculator) {
        this.eventEmitter = new EventEmitter()
        this.orderHandler = orderHandler;
        this.profitCalculator = profitCalculator
    }

    /**
     * @abstract
     * @description initialize the client
     * @param user user of the client
     * @param currency  currency of the strategy
     * @param strategyName name of the strategy the client is associated to
     * @param eventName candle event name that client will use
     * */
    init(user, currency, strategyName, eventName) {}

    /**
     * @description function called when a new order is send, it create an order in database,
     * and start watching stop orders (ex : StopLoss and TakeProfit)
     * @param type
     * @param side
     * @param price
     * @param quantity
     * @param stopPrice
     * @param status
     * @param brokerOrderId
     * @return {Promise<*>} database order id
     */
    async emitNewOrder({
                     type,
                     side,
                     price,
                     quantity,
                     stopPrice,
                     status,
                     brokerOrderId
                 }
    ) {
        let fees = price ? this.calculateFees(price, type) : null
        let accountBalance = price ? this.getBalance() : null

        let orderId = await this.orderHandler.createOrder({
            strategyId: this.strategyId,
            currency: this.user.currency,
            username: this.user.username,
            candleId: this.candleId,
            leverage: this.leverage,
            side: side,
            type: type,
            price: price,
            stopPrice: stopPrice,
            quantity: quantity,
            status: status,
            fees: fees,
            accountBalance: accountBalance,
            gain : status === Order.orderStatus.CLOSE ? this.profitCalculator(price, accountBalance, fees, this.strategyId) : null
        })

        if (type === 'LIMIT') {
            this.hasBeenFullyExecuted()
        }

        if (type !== 'MARKET' || type !== 'LIMIT') {
            this.watchUnexecutedOrder(brokerOrderId, brokerOrderId)
        }

        return orderId
    }

    /**
     * @description watch state of an un-executed order every x second,
     * if its state change it will emit a new event to inform a stop loss has been triggered for example
     * and update associated order
     */
    watchUnexecutedOrder(brokerOrderId, orderId) {
        let intervalId = setInterval(async () => {
            let order = await this.getOrderStatus(brokerOrderId)
            if (order.status) {
                this.eventEmitter.emit(STOP_ORDER_TRIGGERED, orderId, this.strategyId)
                let updatedOrder = this.orderHandler.updateStopOrder(
                    orderId,
                    order.price,
                    this.profitCalculator(
                        order.price, this.getBalance(),
                        this.calculateFees(order.price, order.type),
                        this.strategyId
                    )
                )
                this.eventEmitter.emit(NEW_ORDER, updatedOrder)
                clearInterval(intervalId)
            }
        }, watchOrderInterval)
    }


    /**
     * @description check if the limit order has been fully executed within the timeout time
     * @param brokerOrderId
     * @param orderId
     */
    async hasBeenFullyExecuted(brokerOrderId, orderId) {
        let fullyExecuted = new Promise((resolve, reject) => {
            setTimeout(async () => {
                    let orderStatus = await this.getOrderStatus(brokerOrderId).status
                    resolve(orderStatus)
                },
                limitOrderTimeout
            )
        })

        if (await fullyExecuted === false) {
            logger.info("limit order not fully executed, all order will be canceled", this.strategyId)
            await this.cancelAllOrders()
            let accountBalance = this.getBalance()
            let updatedOrder = await this.orderHandler.updateCanceledLimitOrder(
                orderId,
                this.profitCalculator(null, accountBalance, null, this.strategyId),
                accountBalance
            )
            this.eventEmitter.emit(NEW_ORDER, updatedOrder)
        }
    }

    /**
     * @param price
     * @param type
     * @return {number} fees
     */
    calculateFees(price, type) {
        return type === type.toLowerCase().includes('market') ?
            this.marketFees * this.leverage * price :
            this.limitFees * this.leverage * price
    }

    /** @abstract */
    async limitBuy(quantity, price) {
    }

    /** @abstract */
    async limitSell(quantity, price) {
    }

    /** @abstract */
    async marketBuy(quantity) {
    }

    /** @abstract */
    async marketSell(quantity) {
    }

    /** @abstract */
    async setShortStopLoss(quantity, stopPrice) {
    }

    /** @abstract */
    async setLongStopLoss(quantity, stopPrice) {
    }

    /** @abstract */
    async setLongTakeProfit(quantity, price, type) {
    }

    /** @abstract */
    async setShortTakeProfit(quantity, price, type) {
    }

    /** @abstract */
    async getPositions() {
    }

    /** @abstract */
    async setLeverage(leverage) {
    }

    /** @abstract */
    async cancelAllOrders() {}

    /** @abstract */
    async getOrderStatus(orderId) {}

    /** @abstract */
    async getBalance() {}

}

module.exports = {
    AbstractClient,
    NEW_ORDER
}