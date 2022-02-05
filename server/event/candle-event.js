const EventEmitter = require('events')
const eventEmitter = new EventEmitter()



eventEmitter.on('addCandle', () => {
    console.log('started')
  })
  






module.exports = eventEmitter;