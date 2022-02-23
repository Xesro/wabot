
class CandleDTO{
    /**
     * 
     * @param {String} currency 
     * @param {String} time_frame 
     * @param {Candle} candle 
     */
    constructor(currency,time_frame,candle){
        this.currency = currency; 
        this.time_frame = time_frame; 
        this.candle = candle; 
    }
}

module.exports = CandleDTO; 