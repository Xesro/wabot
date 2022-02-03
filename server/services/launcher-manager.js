const BackLauncher = require('../launchers/back-launcher');

const LiveLauncher = require('../launchers/live-launcher');

class LauncherManager {
    constructor() {
        // subscriber of all created strategies 
        this.strategies = []
        this.subscribers

    }

    /**
     * 
     * @param {Strategy} strategy 
     * @param {boolean} back 
     */
    subscribe(strategy, back) {
        this.strategies.push(back ? new BackLauncher(strategy) : new LiveLauncher(strategy))
    }

   

}






module.exports = LauncherManager;