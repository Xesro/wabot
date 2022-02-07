const RunnerManager = require('./runner-manager')

let runnerManager = new RunnerManager();
let obj ={
    strategyName : 'strategy',
    parameters : [],
    currency : "ethusdt",
    money : 1000,
    time_frame : "1m",

} 
runnerManager.addLiveStrategy(obj)