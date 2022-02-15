import Strategy from "../strategies/strategy";
import LiveCandleProvider from "../provider/live-candle-provider";
import BackTestCandleProvider from "../provider/backtest-candle-provider";

import {findStrategy} from '../strategies';
import Runner from '../runner/runner';
const { NoStrategyFoundException } = require('../strategies/strategy-exception.ts')


export class RunnerManager {
    liveStrategies : Strategy[];
    backTestStrategies :Strategy[];
    liveCandleProvider : LiveCandleProvider;
    backTestCandleProvider: BackTestCandleProvider;

    constructor() {
        this.liveStrategies = []
        this.backTestStrategies = []

    }

    /**
     * 
     * @param {Strategy} strategy 
     * @param {boolean} back 
     */
    addLiveStrategy({ strategyName, parameters, currency, money, time_frame }) {
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
    runStrategy(id) {

    }



}






