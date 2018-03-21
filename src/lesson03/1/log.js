const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('request', (event) => {
   console.log(event);
});

module.exports = emitter;