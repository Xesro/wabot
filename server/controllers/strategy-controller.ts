import {RunnerManager} from '../services/runner-manager';
import {Request, Response} from "express";
class StrategyController {
    runnerManager : RunnerManager;
    constructor() {
        this.runnerManager = new RunnerManager();
    }

    addStrategy(req :Request, res:Response) {

        //parser la requete 
        // creer la strategy 
        // 
        this.runnerManager.addLiveStrategy(req.body);
        res.status(200).send();
    }

    runStrategy(req, res) {

        res.status(200).send();
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
 const StrategyControllerInstance :StrategyController = new StrategyController();
Object.freeze(StrategyControllerInstance);

export   default StrategyControllerInstance