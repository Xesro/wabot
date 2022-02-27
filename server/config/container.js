const awilix  = require('awilix')

containerConfig = {
    globPattern: [
        [
            './models/handler/*.js',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
            }
        ],
        [
            './models/manager/*.js',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
            }
        ],
        [
            './api/*.js',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
            }
        ],
        [
            './services/profitCalculator',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
                register: awilix.asFunction
            }
        ],
    ],

    options: {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: awilix.Lifetime.SINGLETON,
            injectionMode: awilix.InjectionMode.CLASSIC,
            register: awilix.asClass
        }
    }
}

module.exports = containerConfig