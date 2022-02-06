const CandleDTO = require('../dto/candle-dto')
const Logger = require('../logger/logger');
const CandleProvider = require('./candle-provider');
const event = require('../event/candle-event');
const Candle = require('../models/candle');
class LiveCandleProvider extends CandleProvider {

  constructor() {
    super()
  }

  /**
   * Check if there is one instance of a subscription with currency and time_frame, if not, create a new one and create a new event associated 
   * @param {Float} currency 
   * @param {String} time_frame 

   */
  addSubscription(eventName,currency,time_frame) {
    let subscription = this.isNewSubscription(eventName);
    if (!subscription.new) return;
    let callback = (candlesticks) => {
      let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
      let { o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;
      if (!isFinal) return;
      console.info(symbol + " " + interval + " candlestick update");
      // console.info("open: " + open);
      // console.info("high: " + high);
      // console.info("low: " + low);
      // console.info("close: " + close);
      // console.info("volume: " + volume);
      // console.info("isFinal: " + isFinal);

      event.emit(subscription.eventName, new CandleDTO(currency, time_frame, ticks))

    }
    this.binance.futuresSubscribe(`${currency}@kline_${time_frame}`, callback);

  }



}



module.exports = LiveCandleProvider;