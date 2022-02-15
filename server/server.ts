"use strict"

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

require('dotenv').config({path : './config/.env'});

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true
})); // session secret
import loadRoutes from "./routes";
loadRoutes(app);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.listen(PORT, () => {
    console.log(`Your server is ready ! Listen on port : ${PORT}`);
});

export default app;