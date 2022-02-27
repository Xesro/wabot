const Binance = require('node-binance-api');
const AbstractClient = require('./AbstractClient')

/**
 * @description Possible order type
 */
const orderType = {
    LIMIT: 'LIMIT',
    STOP: 'STOP',
    MARKET: 'MARKET',
    STOP_MARKET: 'STOP_MARKET',
    TAKE_PROFIT: 'TAKE_PROFIT',
    TAKE_PROFIT_MARKET: 'TAKE_PROFIT_MARKET'
}

class BinanceClient extends AbstractClient {

    constructor(orderHandler) {
        super(orderHandler);
    }

    init(user, currency, strategyName) {
        this.binance = new Binance().options({
            APIKEY: user.apiKey,
            APISECRET: user.secretKey,
        });

        this.currency = currency;
        this.user = user;
        this.strategyId = strategyName + user.username + Date.now()

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

    async getReturnValue(order, type, stopPrice) {
        if (stopPrice !== undefined) {
            return order.orderId;
        }
        if (type === orderType.LIMIT) {
            return await this.isFullyExecuted(order)
        }
        return true
    }

    async buy(quantity, price, type, stopPrice) {
        let order = await this.binance.futuresBuy(
            this.currency,
            quantity,
            type ===  orderType.MARKET ? null : price,
            this.getParams(type, stopPrice)
        );

        this.emitNewOrder({
            type: type,
            side: "buy",
            price: orderType.MARKET ? order.avgPrice : price,
            quantity : quantity,
            stopPrice: stopPrice
        })

        return this.getReturnValue(order, type, stopPrice)
    }

    async sell(quantity, price, type, stopPrice) {
        let order = await this.binance.futuresSell(
            this.currency,
            quantity,
            type ===  orderType.MARKET ? null : price,
            this.getParams(type, stopPrice)
        );

        this.emitNewOrder({
            type: type,
            side: "sell",
            price: orderType.MARKET ? order.avgPrice : price,
            quantity : quantity,
            stopPrice: stopPrice
        })

        return this.getReturnValue(order, type, stopPrice)
    }

    async limitBuy(quantity, price) {
       return  this.buy(quantity, price, orderType.LIMIT)
    }

    async limitSell(quantity, price) {
        return this.sell(quantity, price, orderType.LIMIT)
    }

    async marketBuy(quantity) {
        return this.buy(quantity, null, orderType.MARKET)
    }

    async marketSell(quantity) {
        return this.sell(quantity, null, orderType.MARKET)
    }

    async setShortStopLoss(quantity, stopPrice) {
        return this.buy(quantity, null, orderType.STOP_MARKET, stopPrice)
    }

    async setLongStopLoss(quantity, stopPrice) {
        return this.sell(quantity, null, orderType.STOP_MARKET, stopPrice)
    }

    async setLongTakeProfit(quantity, price, type, stopPrice) {
        return this.sell(quantity, null, type, stopPrice)
    }

    async setShortTakeProfit(quantity, price, type, stopPrice) {
        return this.sell(quantity, null, type, stopPrice)
    }

    async getPositions(strategyId) {
        return await this.binance.futuresPositionRisk()
    }

    async setLeverage(leverage) {
        let lever = await this.binance.futuresLeverage(
            this.currency,
            leverage
        )
        //check le res
    }

    async cancelAllOrders() {
        let res = await this.binance.cancelAll(this.currency);
        //check le res
    }

    async getOrderStatus(orderId) {
        let order = await this.binance.futuresOrderStatus(this.currency, {orderID : orderId })
        return order.origQty === order.executedQty;
    }

}

module.exports =  BinanceClient
