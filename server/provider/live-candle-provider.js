const Binance = require('node-binance-api');
const CandleDTO = require('../dto/candle-dto')

const Logger = require('../logger/logger');

class LiveCandleProvider {

  constructor(key, secret) {
    this.binance = new Binance().options({
      APIKEY: `${key}`,
      APISECRET: `${secret}`
    });
    this.subscriptions = new Set();
  }
  /**
   * Check if there is one instance of a subscription with currency and time_frame, if not, create a new one and create a new event associated 
   * @param {*} currency 
   * @param {*} time_frame 
   * @returns 
   */
  addSubscription(currency, time_frame) {
    let subscription = `candle-${time_frame}-${currency}`;
    if (this.subscriptions.has(subscription)) return;
    this.subscriptions.add(subscription);
    let callback = (error, ticks) => {
      if (error) Logger.warn('live-candle-provider', error.message);
      let candlestick = ticks[ticks.length - 1];
      event.emit(subscription, new CandleDTO(currency, time_frame, candlestick))

    };
    binance.candlesticks(currency, time_frame, callback);
  }



}



module.exports = LiveCandleProvider;