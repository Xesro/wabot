const { AbstractClient}  = require('./AbstractClient')
const order = require('../models').Order

class BacktestClient extends AbstractClient {

    limitFees = 0.002
    marketFees = 0.004

    constructor(orderHandler) {
        super(orderHandler);
    }

    init(user, currency, strategyName, candleEventName) {

        this.currency = currency;
        this.user = user;
        this.strategyId = strategyName + '_' + Date.now() + '_backtest'
        this.backtest = true
        this.candleEventName = candleEventName

        this.eventEmitter.on(candleEventName, (candle) => {
            this.candleId = candle.id
        })

        return this;
    }

    async buy(quantity, price, status, type, stopPrice) {
        return await this.emitNewOrder({
            type: type,
            side: "buy",
            price: type === orderType.MARKET ? order.avgPrice : price,
            quantity : quantity,
            stopPrice: stopPrice,
            status : status,
            brokerOrderId : order.orderID
        })
    }

    async sell(quantity, price, status, type, stopPrice, ) {
        return await this.emitNewOrder({
            type: type,
            side: "sell",
            price: type === orderType.MARKET ? order.avgPrice : price,
            quantity : quantity,
            stopPrice: stopPrice,
            status : status,
            brokerOrderId :  order.orderID
        })
    }

    async limitBuy(quantity, price, status) {
        return this.buy(quantity, price, status, orderType.LIMIT)
    }

    async limitSell(quantity, price, status) {
        return this.sell(quantity, price, status, orderType.LIMIT)
    }

    async marketBuy(quantity, status) {
        return this.buy(quantity, null, status, orderType.MARKET)
    }

    async marketSell(quantity, status) {
        return this.sell(quantity, null, status,  orderType.MARKET)
    }

    async setShortStopLoss(quantity, stopPrice) {
        return this.buy(quantity, null, order.orderStatus.CLOSE, orderType.STOP_MARKET, stopPrice)
    }

    async setLongStopLoss(quantity, stopPrice) {
        return this.sell(quantity, null, order.orderStatus.CLOSE, orderType.STOP_MARKET, stopPrice)
    }

    async setLongTakeProfit(quantity, price, type, stopPrice) {
        return this.sell(quantity, null, order.orderStatus.CLOSE, type, stopPrice)
    }

    async setShortTakeProfit(quantity, price, type, stopPrice) {
        return this.sell(quantity, null,order.orderStatus.CLOSE,  type, stopPrice)
    }

    async getPositions(strategyId) {
        return null
    }

    async setLeverage(leverage) {
        this.leverage = leverage
    }

    async getOrderStatus(orderId) {
        return Promise.resolve(null);
    }

    async cancelAllOrders() {
        return Promise.resolve(null);
    }

    /**
     * @description get account balances et return the one in USDT
     */
    async getBalance() {
        return Promise.resolve(null);
    }
}

module.exports =  BacktestClient
