const EventEmitter = require('events')
const candleEmitter = new EventEmitter()



eventEmitter.on('addCandle', (candle) => {
    console.log('started')
  })
  






module.exports = candleEmitter;