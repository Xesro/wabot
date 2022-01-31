const loginRoutes = require('./login');

module.exports = function (app) {
    app.use('/login', loginRoutes)
};