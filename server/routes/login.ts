'use strict'


import express from 'express';
const router = express.Router();
import passport from "passport";
import User from '../models/user';

require('../config/passport/passport')(passport, User);

router.route('/identification').post( passport.authenticate('local-signin', {
        successRedirect :"ok",
        failureRedirect: 'ko'
    }
));

export default router;