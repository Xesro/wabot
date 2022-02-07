const Logger = require('../logger/logger')
const event = require('../event/candle-event')
class Runner {
    /**
     * 
     * @param {Strategy} strategy 
     */
    constructor(strategy) {
        this.strategy = strategy;
        this.launched = true;
    }
    subscribe(nameEvent) {
        event.on(nameEvent, async (candleDTO) => {
            if (this.launched) {
               await this.strategy.listen(candleDTO);
            }

        });
    }
    run() {
        this.launched = true;
    }
    stop() {
        this.launched = false;
    }

}


module.exports = Runner; 