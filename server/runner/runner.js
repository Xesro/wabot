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
        this.finished = true;

    }
    subscribe(nameEvent) {
        event.on(nameEvent, async (candleDTO) => {
            if (this.finished && this.launched) {
                this.finished = await this.strategy.listen(candleDTO);
            }
            else {
                Logger.info('runner', `I'm waiting candle bro ! `)
            }
        })
    }
    run() {
        this.launched = true;
    }
    stop() {
        this.launched = false;
    }

}


module.exports = Runner; 