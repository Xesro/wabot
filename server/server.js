"use strict"

const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const passport   = require('passport')

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

require('./routes')(app);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.listen(PORT, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Your server is ready ! Listen on port : ${PORT}`);
});

// SETUP CONTAINER
const awilix  = require('awilix')
const containerConfig = require('./config/container')

const container = awilix.createContainer()

container.loadModules(
    containerConfig.globPattern,
    containerConfig.options
)
// SETUP CONTAINER

module.export = app;