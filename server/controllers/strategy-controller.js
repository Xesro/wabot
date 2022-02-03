const LauncherManager = require('../services/launcher-manager')

class StrategyController{
    constructor(){
        this.launcherManager = new LauncherManager();
    }

    addStrategy(req,res){
        
        //parser la requete 
            // creer la strategy 
            // 
       // this.launcherManager.a
        res.statut(200).send();
    }


}
/**
 * Give a unique instance
 */
const StrategyControllerInstance = new StrategyController(); 
Object.freeze(StrategyControllerInstance);

module.exports = StrategyControllerInstance; 