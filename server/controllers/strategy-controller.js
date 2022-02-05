const LauncherManager = require('../services/launcher-manager')

class StrategyController {
    constructor() {
        this.launcherManager = new LauncherManager();
    }

    addStrategy(req, res) {

        //parser la requete 
        // creer la strategy 
        // 
        // this.launcherManager.a
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