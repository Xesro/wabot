const Binance = require('node-binance-api');

class CandleProvider {
  constructor() {
    this.binance = new Binance();
    this.subscriptions = new Set();
  }

  isNewSubscription(eventName) {

    if (this.subscriptions.has(eventName)) return { new: false }
    this.subscriptions.add(eventName);
    return { new: true, eventName: eventName }
  }
}

module.exports = CandleProvider; 