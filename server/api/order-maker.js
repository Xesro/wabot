const logger = require("../logger/logger");
const Binance = require('node-binance-api');
const EventEmitter = require('events');

const Order = require('../models').Order;
const OrderHandler = require('../models/handler/order-handler');

const limitOrderTimeout = 450000;
const NEW_ORDER = "newOrder";

class OrderMaker {

    clients = {}

    constructor() {
        this.eventEmitter = new EventEmitter()
    }

    addBinanceClient(strategyId, user, currency ) {
        this.clients[strategyId] = {
            broker: new Binance().options({
                APIKEY: user.api_key,
                APISECRET: user.secret_key,
            }),
            user: user,
            currency: currency
        }
    }

    deleteClient(strategyId) {
        delete this.clients[strategyId]
    }

    async limitBuy(strategyId, quantity, price) {
        let order = await this.clients[strategyId].broker.futuresBuy(this.currency, quantity, price);
        this.emitNewOrder({
            strategyId: strategyId,
            type: "limit",
            side: "buy",
            price: price,
            quantity : quantity,
        })
        return await this.isFullyExecuted(order, strategyId);
    }

    async limitSell(strategyId, quantity, price) {
        let order = await this.clients[strategyId].broker.futuresSell(this.currency, quantity, price);
    }

    async marketBuy(strategyId, quantity) {
        let order = await this.clients[strategyId].broker.futuresMarketBuy(this.currency, quantity);
    }

    async marketSell(strategyId, quantity) {
        let order = await this.clients[strategyId].broker.futuresMarketSell()(this.currency, quantity);
    }

    async setShortStopLoss(strategyId, quantity, stopPrice) {
        let order = await this.clients[strategyId].broker.futuresMarketBuy(this.currency, quantity, {stopPrice : stopPrice, type: "STOP_MARKET"});
    }

    async setLongStopLoss(strategyId, quantity, stopPrice) {
        let order = await this.clients[strategyId].broker.futuresMarketSell(this.currency, quantity, {stopPrice : stopPrice, type: "STOP_MARKET"});
    }

    async setLongTakeProfit(strategyId, quantity, price, type) {
        let order = await this.clients[strategyId].broker.futuresSell(this.currency, quantity, {stopPrice : price, type: type});
    }

    async setShortTakeProfit(strategyId, quantity, price, type) {
        let order = await this.clients[strategyId].broker.futuresBuy(this.currency, quantity, {stopPrice : price, type: type});
    }

    async getPositions(strategyId) {
        let positions = await this.clients[strategyId].broker.futuresPositionRisk()
    }

    async setLeverage(strategyId, leverage) {
        let lever = await this.clients[strategyId].broker.futuresLeverage( this.currency, leverage)
    }

    async cancelAllOrders(strategy) {
        let res = await this.clients[strategyId].broker.cancelAll(this.currency);
    }

    isSuccess(response) {
        if (response.code !== undefined) {
            logger.error(response);
            //stoper la strat
            return false;
        }

        return true;
    }

    async getOrderStatus(orderId) {
        let order = await this.binance.futuresOrderStatus('ETHUSDT', {orderID : orderId })
        return order.origQty === order.executedQty;
    }

    async isFullyExecuted(response, strategyId) {
        let fullyExecuted = new Promise( (resolve, reject) => {
            setTimeout( async () => {
                let orderStatus = await this.getOrderStatus(response.OrderId)
                resolve(orderStatus)
                },
                limitOrderTimeout
            )
        })


        if (fullyExecuted === false) {
            logger.info("limit order not fully executed, all order will be canceled", response, strategyId)
            this.clients[strategyId].binance.futuresCancelAll();
            OrderHandler.updateStatus()
        }

        return fullyExecuted;
    }

    emitNewOrder({
        strategyId,
        type,
        side,
        price,
        quantity,
        stopPrice,})
    {
        let newOrder = Order.build({
            strategyId: strategyId,
            currency: this.clients[strategyId].currency,
            username: this.clients[strategyId].user.username,
            side: side,
            type: type,
            price: price,
            stopPrice: stopPrice,
            quantity: quantity
        })

        this.eventEmitter.emit(NEW_ORDER, newOrder)
    }

}