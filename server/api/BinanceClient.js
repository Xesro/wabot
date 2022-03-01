const Binance = require('node-binance-api');
const { AbstractClient}  = require('./AbstractClient')
const order = require('../models').Order
const eventEmitter = require('events')

/**
 * @description Possible order type
 */
const orderType = {
    LIMIT: 'LIMIT',
    MARKET: 'MARKET',
    STOP: 'STOP',
    STOP_MARKET: 'STOP_MARKET',
    TAKE_PROFIT: 'TAKE_PROFIT',
    TAKE_PROFIT_MARKET: 'TAKE_PROFIT_MARKET'
}

class BinanceClient extends AbstractClient {

    limitFees = 0.002
    marketFees = 0.004

    constructor(orderHandler) {
        super(orderHandler);
    }

    init(user, currency, strategyName, eventName) {
        this.binance = new Binance().options({
            APIKEY: user.apiKey,
            APISECRET: user.secretKey,
        });

        this.currency = currency;
        this.user = user;
        this.strategyId = strategyName + '_' + Date.now()

        eventEmitter.on(eventName, (candle) => {
            this.candle = candle
        })

        return this;
    }

    getParams(type, stopPrice) {
        let params = {
            type: type
        }

        if (type === orderType.MARKET) {
            params.newOrderRespType = 'RESULT'
        }
        if (stopPrice !== undefined) {
            params.stopPrice = stopPrice
        }

        return params
    }

    async buy(quantity, price, status, type, stopPrice) {
        let order = await this.binance.futuresBuy(
            this.currency,
            quantity,
            type === orderType.MARKET ? null : price,
            this.getParams(type, stopPrice)
        );

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

        let order = await this.binance.futuresSell(
            this.currency,
            quantity,
            type === orderType.MARKET ? null : price,
            this.getParams(type, stopPrice)
        );

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
       return  this.buy(quantity, price, status, orderType.LIMIT)
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

    /**
     * @param quantity
     * @param price
     * @param type TAKE_PROFIT ou TAKE_PROFIT_MARKET
     * @param stopPrice
     * @return {Promise<*>}
     */
    async setLongTakeProfit(quantity, price, type, stopPrice) {
        return this.sell(quantity, null, order.orderStatus.CLOSE, type, stopPrice)
    }

    /**
     *
     * @param quantity
     * @param price
     * @param type TAKE_PROFIT ou TAKE_PROFIT_MARKET
     * @param stopPrice
     * @return {Promise<*>}
     */
    async setShortTakeProfit(quantity, price, type, stopPrice) {
        return this.buy(quantity, null,order.orderStatus.CLOSE,  type, stopPrice)
    }

    async getPositions(strategyId) {
        return await this.binance.futuresPositionRisk()
    }

    async setLeverage(leverage) {
        let lever = await this.binance.futuresLeverage(
            this.currency,
            leverage
        )

        this.leverage = leverage
        //check le res
    }

    async cancelAllOrders() {
        let res = await this.binance.cancelAll(this.currency);
        //check le res
    }

    async getOrderStatus(orderId) {
        return this.normalizeOrder(await this.binance.futuresOrderStatus(this.currency, {orderID : orderId }))
    }

    /**
     * @description get account balances et return the one in USDT
     */
    async getBalance() {
        let balance = await this.binance.futuresBalance();
        balance.forEach((account) => {
            if (account.asset === "USDT") {
                return account.balance
            }
        })
    }

    normalizeOrder(order) {
        let status = null
        if (order.status === "CANCELED") {
            status = this.executionStatus.canceled
        }
        else if (order.origQty === order.executedQty){
            status = this.executionStatus.executed
        }

        return {
            orderId: order.orderId,
            symbol: order.symbol,
            price: order.price !== 0 ? order.price : order.avgPrice,
            type: order.type,
            closePosition: false,
            side: order.side,
            stopPrice: order.stopPrice,
            status: status,
            // clientOrderId: 'LWQS6ZKjSspOmAW1sewvi6',
            // avgPrice: '0.00000',
            // origQty: ,
            // executedQty: '0',
            // cumQuote: '0',
            // timeInForce: 'GTC',
            // reduceOnly: false,
            // positionSide: 'BOTH',
            // workingType: 'CONTRACT_PRICE',
            // priceProtect: false,
            // origType: 'STOP_MARKET',
            // time: 1646058598037,
            // updateTime: 1646058598037
        }
    }

}

module.exports =  BinanceClient
