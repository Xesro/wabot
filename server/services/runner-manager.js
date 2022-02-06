

const BackTestCandleProvider = require('../provider/backtest-candle-provider')
const LiveCandleProvider = require('../provider/live-candle-provider')

const key = '6qanpPzlVOfZyYFnUMyKgapGF2nxazO0hZUOXCKjdRxMKR2D9fiRJn6cduZeJv87'
const secret = 'S0aotxEMvsVcOYl2JJj4vkH0LxfBM15ZwAilvpdiTxM13n6EABWeYvAtRxNRAnd6'
class RunnerManager {
    constructor() {
        // subscriber of all created strategies 
        this.liveStrategies = []
        this.backTestStrategies = []
       // this.subscriber = new BinanceSubscriber(key,secret);
        this.liveCandleProvider = new LiveCandleProvider(key,secret)
    }

    /**
     * 
     * @param {Strategy} strategy 
     * @param {boolean} back 
     */
    addLiveStrategy({parameters,currency,money,time_frame}) {
        const runner =  new Runner(strategy)
        launcher.subscribe(currency,time_frame)
        
        this.strategies.push()
    }
    addBackStrategy({parameters,currency,money,time_frame}){
        const runner =  new Runner(new Strategy());
        
        //let nameEvent = `candle-${}`
        runner.subscribe(currency,)
    }

   

}






module.exports = LauncherManager;