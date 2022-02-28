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