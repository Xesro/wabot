'use strict'

const controllers = require("../controllers");
const router = require('express').Router();
const passport = require("passport");
const User = require('../models').User;

require('../config/passport/passport')(passport, User);

router.route('/identification').post( passport.authenticate('local-signin', {
        successRedirect: console.log("ok"),
        failureRedirect: console.log('ko')
    }
));

module.exports = router;