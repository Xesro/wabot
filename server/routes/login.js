'use strict'

var express = require('express');
var router = express.Router();



router.post('/identification',function(req,res){

    console.log(req.params)
    console.log(req.body)
    console.log("demande de login");
})


module.exports = router;