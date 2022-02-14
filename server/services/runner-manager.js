

const BackTestCandleProvider = require('../provider/backtest-candle-provider');
const LiveCandleProvider = require('../provider/live-candle-provider');

const {findStrategy} = require('../strategies');
const Runner = require('../runner/runner');
const { NoStrategyFoundException } = require('../strategies/strategy-exception')


class RunnerManager {
    constructor() {
        this.liveStrategies = []
        this.backTestStrategies = []
        this.liveCandleProvider = new LiveCandleProvider();
        this.backTestCandleProvider = new BackTestCandleProvider();
    }

    // ajouter les provider autre interface 


    // interface 
    /**
     * 
     * @param {Strategy} strategy  
     * @param {boolean} back 
     */
    addLiveStrategy({  strategyName , parameters, currency, money, time_frame }) {
        let strategyClass = findStrategy(strategyName);
        if (!strategyClass) throw new NoStrategyFoundException(strategyName);
        let strategy = new strategyClass(parameters);
        let eventName = `candle-${time_frame}-${currency}`;
        this.liveCandleProvider.addSubscription(eventName, currency, time_frame);
        const runner = new Runner(strategy);
        runner.subscribe(eventName)
        // push avec nouveau id 
        //this.strategies.push()
    }

    addBackStrategy({ parameters, currency, money, time_frame }) {
        //        const runner = new Runner(new Strategy());

    }



    // interface
    runStrategy(id) {

    }



}






module.exports = RunnerManager;