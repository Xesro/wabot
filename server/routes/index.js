const loginRouter = require('./login');
const strategyRouter = require('./strategy');

module.exports = function (app) {
    app.use('/login', loginRouter)
    app.use('/strategy', loginRouter)
};