//MODELS
const Order = require('../models').Order

function calculateGains(price, accountBalance, fees, strategyId) {
    console.log("tototot")
    const {container} = require('../server')
    const orderHandler = container.cradle.orderHandler

    let gain = 0
    let lastOpenedOrder = null

    // gains are calculated compared to the corresponding opened position
    lastOpenedOrder = orderHandler.findLastOpened(strategyId);

    //calculate gains if we are backtesting strategy
    if (strategyId.contains("backtest")) {
        gain = (lastOpenedOrder.side === "buy" ? (price - lastOpenedOrder.price) : (lastOpenedOrder.price - price)) *
            lastOpenedOrder.quantity * lastOpenedOrder.leverage - (lastOpenedOrder.fees + fees)
    }

    // calculate gains for live strategy
    if (!strategyId.contains("backtest")) {
        gain = lastOpenedOrder.accountBalance - accountBalance
    }

    return gain
}

module.exports = calculateGains

