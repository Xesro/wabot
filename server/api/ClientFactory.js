class ClientFactory {
    constructor() {
        const {container} = require('../server');
        this.container = container;
    }

    getClient(brokerClass, user, currency) {
        return this.container.resolve(brokerClass).init(user, currency);
    }
}

module.exports = ClientFactory