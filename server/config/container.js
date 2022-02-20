const awilix  = require('awilix')

containerConfig = {
    globPattern: [
        './api/*.js',
        [
            './models/handler/*.js',
            {
                lifetime: awilix.Lifetime.TRANSIENT,
            }
        ]
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