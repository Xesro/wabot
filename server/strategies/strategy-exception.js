const Logger = require('../logger/logger')

function NoStrategyFoundException(strategyName) {
    Logger.info(`no strategy match with the strategyName given "${strategyName}"`);
}
module.exports = { NoStrategyFoundException }