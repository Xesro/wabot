const RunnerManager = require('../services/runner-manager')

class StrategyController {
    constructor() {
        this.runnerManager = new RunnerManager();
    }

    addStrategy(req, res) {

        //parser la requete 
        // creer la strategy 
        // 
        this.runnerManager.addLiveStrategy(req.body);
        res.statut(200).send();
    }

    runStrategy(req, res) {

        res.statut(200).send();
    }


    stopStrategy(req, res) {
        res.statut(200).send();
    }

    /**
     * save all parameter of a strategy in db. 
     * @param {*} req 
     * @param {*} res 
     */
    saveStrategy(req, res) {

    }

}
/**
 * Give a unique instance
 */
const StrategyControllerInstance = new StrategyController();
Object.freeze(StrategyControllerInstance);

module.exports = StrategyControllerInstance; 