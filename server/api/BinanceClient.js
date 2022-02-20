const logger = require("../logger/logger");

const Binance = require('node-binance-api');
const EventEmitter = require('events');
const Order = require('../models').Order;

type = {
    TAKE_PROFIT_LIMIT: "TAKE_PROFIT_LIMIT",
    TAKE_PROFIT: "TAKE_PROFIT"
}

const limitOrderTimeout = 450000;

class BinanceClient {
    constructor(user, currency, strategyId,  backtest) {
        this.binance = new Binance().options({
            APIKEY: user.api_key,
            APISECRET: user.secret_key,
            test : backtest
        });

        this.currency = currency;
        this.strategyId = strategyId;
        this.eventEmitter = new EventEmitter()
    }

    async limitBuy(quantity, price) {
        let order = await this.binance.futuresBuy(this.currency, quantity, price);
        if (!await this.isFullyExecuted(order)){

        }
    }

    async limitSell(quantity, price) {
        let order = await this.binance.futuresSell(this.currency, quantity, price);
    }

    async marketBuy(quantity) {
        let order = await this.binance.futuresMarketBuy(this.currency, quantity);
    }

    async marketSell(quantity) {
        let order = await this.binance.futuresMarketSell()(this.currency, quantity);
    }

    async setShortStopLoss(quantity, stopPrice) {
        let order = await this.binance.futuresMarketBuy(this.currency, quantity, {stopPrice : stopPrice, type: "STOP_MARKET"});
    }

    async setLongStopLoss(quantity, stopPrice) {
        let order = await this.binance.futuresMarketSell(this.currency, quantity, {stopPrice : stopPrice, type: "STOP_MARKET"});
    }

    async setLongTakeProfit(quantity, price, type) {
        let order = await this.binance.futuresSell(this.currency, quantity, {stopPrice : price, type: type});
    }

    async setShortTakeProfit(quantity, price, type) {
        let order = await this.binance.futuresBuy(this.currency, quantity, {stopPrice : price, type: type});
    }

    async getPositions() {
        let positions = await this.binance.futuresPositionRisk()
    }

    async setLeverage(leverage) {
        let lever = await this.binance.futuresLeverage( this.currency, leverage)
    }

    async cancelAllOrders() {
        let res = await this.binance.cancelAll(this.currency);
    }

    newOrder(response, strategyId, candleId) {
        if (this.isSuccess()) {
            this.eventEmitter.emit(
                "newOrder",
                Order.create({
                    type : response.type,
                    price : response.price,
                    stopPrice : response.stopPrice,
                    quantity : response.origQty,
                    currency : response.symbol,
                    strategyId : strategyId,
                    candleId : candleId
                })
            );
        }
    }

    isSuccess(response) {
        if (response.code !== undefined) {
            logger.error(response);
            //stoper la strat
            return false;
        }

        return true;
    }

    async isFullyExecuted(response) {
        let fullyExecuted = new Promise(async function (resolve, reject) {
            setTimeout(
                resolve(await getOrderState(response.OrderId)),
                limitOrderTimeout
            )
        })


        if (fullyExecuted === false) {
            logger.info("limit order not fully executed, all order will be canceled", response, this.strategyId)
            this.binance.futuresCancelAll();
        }

        return fullyExecuted;
    }

    async getOrderState(orderId) {
        let order = await this.binance.futuresOrderStatus('ETHUSDT', {orderID : orderId })
        return order.origQty === order.executedQty;
    }
}

module.exports = { BinanceClient, type };