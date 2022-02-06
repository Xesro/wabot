const Strategy = require("./strategy");


const store = {

    'strategy': Strategy,




}

/**
 * @param {String} name of the strategy 
 * @returns false if no strategy found / strategy class if it existant
 */
function findStrategy(name) {
    return name in store ? store[name] : false;
}



module.exports = findStrategy; 