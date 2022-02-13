const Order = require('../index').Order;
const EntityHandler = require('./entity-handler')
//const logger = require('../../logger/logger.js')

class OrderHandler extends EntityHandler{

    constructor() {
        super();
        this.entity = Order
    }

    updateStatus(id, status) {
        this.updateById(
            {status : status},
            id
        )
    }
}

module.exports = OrderHandler
