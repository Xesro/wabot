import Strategy from "../strategies/strategy";



import event  from '../event/candle-event';
class Runner {
    /**
     *
     */
    strategy:Strategy;
    launched: boolean;
    constructor(strategy:Strategy) {
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


export default Runner;