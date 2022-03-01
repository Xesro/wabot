const EntityManager = require('./EntityManager')
const Order = require('../index').Order

class OrderManager extends EntityManager {
    constructor() {
        super();
        this.entity = Order
    }

    async findLastOpened(strategyId) {
        return await Order.findOne({
            where : {
                strategyId: strategyId,
                status : Order.orderStatus.OPEN
            },
            order: [['id', 'DESC']],
            limit: 1
        })
    }
}