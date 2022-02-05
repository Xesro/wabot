const router = require('express').Router();
const strategyController = require('../controllers/strategy-controller')


/**
 * add new strategy 
 */
router.post('add', (req, res) => {
    strategyController.addStrategy(req,res);
})



/**
 * run a strategy 
 */
 router.get('run/:id', (req, res) => {
    strategyController.runStrategy(req,res);
});

/**
 * stop a strategy 
 */
 router.get('stop/:id', (req, res) => {
    strategyController.stopStrategy(req,res);
});





module.exports = router;