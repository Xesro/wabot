//CONTAINER
const {container} = require('../server')
//DATABASE MANAGEMENT
const orderHandler = container.cradle.orderHandler
//MODELS
const Order = require('../models').Order

function calculateGains(price, accountBalance, fees, strategyId) {
    let gain = 0
    let lastOpenedOrder = null

    lastOpenedOrder = orderHandler.findLastOpened(strategyId);

    if (strategyId.contains("backtest")) {
        gain = (lastOpenedOrder.side === "buy" ? (price - lastOpenedOrder.price) : (lastOpenedOrder.price - price)) *
            lastOpenedOrder.quantity * lastOpenedOrder.leverage - (lastOpenedOrder.fees + fees)
    }

    if (!strategyId.contains("backtest")) {
        gain = lastOpenedOrder.accountBalance - accountBalance
    }

    return gain
}

module.exports = calculateGains

