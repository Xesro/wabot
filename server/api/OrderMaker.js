const logger = require("../logger/logger");
const Binance = require('node-binance-api');
const EventEmitter = require('events');

const Order = require('../models').Order;
// const OrderHandler = require('../models/handler/OrderHandler');

const limitOrderTimeout = 450000;
const NEW_ORDER = "newOrder";

class OrderMaker {

    clients = {}

    constructor(orderHandler) {
        this.eventEmitter = new EventEmitter()
        this.orderHandler = orderHandler;
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
        let order = await this.clients[strategyId].broker.futuresBuy(
            this.clients[strategyId].currency,
            quantity,
            price
        );
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
        let order = await this.clients[strategyId].broker.futuresSell(
            this.clients[strategyId].currency,
            quantity,
            price
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "limit",
            side: "sell",
            price: price,
            quantity : quantity,
        })
        return await this.isFullyExecuted(order, strategyId);
    }

    async marketBuy(strategyId, quantity) {
        let order = await this.clients[strategyId].broker.futuresMarketBuy(
            this.clients[strategyId].currency,
            quantity,
            { newOrderRespType: 'RESULT' }
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "market",
            side: "buy",
            price: order.avgPrice,
            quantity : quantity,
        })
        return true;
    }

    async marketSell(strategyId, quantity) {
        let order = await this.clients[strategyId].broker.futuresMarketSell()(
            this.clients[strategyId].currency,
            quantity,
            { newOrderRespType: 'RESULT' }
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "market",
            side: "sell",
            price: order.avgPrice,
            quantity : quantity,
        })
        return true;
    }

    async setShortStopLoss(strategyId, quantity, stopPrice) {
        let order = await this.clients[strategyId].broker.futuresMarketBuy(
            this.clients[strategyId].currency,
            quantity,
            {stopPrice : stopPrice, type: "STOP_MARKET"} //revoir le type
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "stop_market",
            side: "buy",
            stopPrice: stopPrice,
            quantity : quantity,
        })
        return order.orderId;
    }

    async setLongStopLoss(strategyId, quantity, stopPrice) {
        let order = await this.clients[strategyId].broker.futuresMarketSell(
            this.clients[strategyId].currency,
            quantity,
            {stopPrice : stopPrice, type: "STOP_MARKET"} // revoir le type
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "stop_market",
            side: "sell",
            stopPrice: stopPrice,
            quantity : quantity,
        })
        return order.orderId;
    }

    async setLongTakeProfit(strategyId, quantity, price, type) {
        let order = await this.clients[strategyId].broker.futuresSell(
            this.clients[strategyId].currency,
            quantity,
            {stopPrice : price, type: type} // faire des constantes pour les types
        );
        this.emitNewOrder({
            strategyId: strategyId,
            type: "stop_market",
            side: "sell",
            stopPrice: stopPrice,
            quantity : quantity,
        })
        return order.orderId;
    }

    async setShortTakeProfit(strategyId, quantity, price, type) {
        let order = await this.clients[strategyId].broker.futuresBuy(
            this.clients[strategyId].currency,
            quantity, {stopPrice : price, type: type}
        );
        //TODO
    }

    async getPositions(strategyId) {
        let positions = await this.clients[strategyId].broker.futuresPositionRisk()
        //TODO
    }

    async setLeverage(strategyId, leverage) {
        let lever = await this.clients[strategyId].broker.futuresLeverage(
            this.clients[strategyId].currency,
            leverage
        )
        //TODO
    }

    async cancelAllOrders(strategy) {
        let res = await this.clients[strategyId].broker.cancelAll(this.clients[strategyId].currency);
        //TODO
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
                     stopPrice,}
    )
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

module.exports = OrderMaker
