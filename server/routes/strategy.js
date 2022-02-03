const router = require('express').Router();
const strategyController = require('../controllers/strategy-controller')


/**
 * 
 */
router.post('add', (req, res) => {
    strategyController.addStrategy(req,res);
})



module.exports = router;