import express, {Request,Response} from 'express';
import strategyController from "../controllers/strategy-controller";
const router = express.Router();


/**
 * add new strategy 
 */
router.post('add', (req:Request, res : Response) => {

    strategyController.addStrategy(req,res);
})



/**
 * run a strategy 
 */
 router.get('run/:id', (req:Request, res:Response) => {
    strategyController.runStrategy(req,res);
});

/**
 * stop a strategy 
 */
 router.get('stop/:id', (req:Request, res:Response) => {
    strategyController.stopStrategy(req,res);
});





export default router;