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

// setup container
const awilix  = require('awilix')

const container = awilix.createContainer()

// Load our modules!
container.loadModules([
        // Globs!
        // To have different resolverOptions for specific modules.
        [
            './models/handler/*.js',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
                register: awilix.asClass
            }
        ]
    ], {
        // We want to register `UserService` as `userService` -
        // by default loaded modules are registered with the
        // name of the file (minus the extension)
        formatName: 'camelCase',
        // Apply resolver options to all modules.
        resolverOptions: {
            // We can give these auto-loaded modules
            // the deal of a lifetime! (see what I did there?)
            // By default it's `TRANSIENT`.
            lifetime: awilix.Lifetime.SINGLETON,
            injectionMode: awilix.InjectionMode.CLASSIC,
            // We can tell Awilix what to register everything as,
            // instead of guessing. If omitted, will inspect the
            // module to determinw what to register as.
            register: awilix.asClass

        }
    }
)

console.log(container.registrations)
container.cradle.orderHandler.updateStatus(1, "executed")


module.export = app;