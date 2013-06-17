var EventEmitter = require('events').EventEmitter,
    evproxy = require('../');

var dest = new EventEmitter(),
    source = new EventEmitter();

evproxy({ source: source, destination: dest });

dest.on('event', function (arg) {
  console.log('got event', arg);
});

dest.on('next event', function (arg0, arg1) {
  console.log('got next event', arg0, arg1);
});

source.emit('event', 42);
source.emit('next event', 1, -1);
