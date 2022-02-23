const fs = require('fs');
const path = require('path')
const basename = path.basename(module.filename);
const strategies = {}


fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const strategy = require('./' + file);
        strategies[strategy.name] = strategy;
    });

/**
 * @param {String} name of the strategy 
 * @returns false if no strategy found / strategy class if it existant
 */
function findStrategy(name) {
    return name in strategies ? strategies[name] : false;
}



module.exports = {findStrategy,strategies}; 