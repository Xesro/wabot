const CandleDTO = require('../dto/candle-dto')
const Logger = require('../logger/logger');
const CandleProvider = require('./candle-provider');
const event = require('../event/candle-event')
class BackTestCandleProvider extends CandleProvider {

  constructor() {
    super()
  }

  /**
   * Check if there is one instance of a subscription with currency and time_frame, if not, create a new one and create a new event associated 
   * @param {Float} currency 
   * @param {String} time_frame 

   */
  addSubscription(currency, time_frame) {
    let subscription = this.isNewSubscription(currency, time_frame);
    if (!subscription.new) return;
    let callback = (error, ticks) => {
      if (error) Logger.warn('backtest-candle-provider', error.message);
      let candlestick = ticks[ticks.length - 1];
      event.emit(subscription, new CandleDTO(currency, time_frame, candlestick))
    };
//    binance.candlesticks(currency, time_frame, callback);
  }



}



module.exports = BackTestCandleProvider;