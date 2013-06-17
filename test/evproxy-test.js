var assert = require('assert'),
    EventEmitter = require('events').EventEmitter,
    cb = require('assert-called'),
    evproxy = require('../');

var dest = new EventEmitter(),
    source = new EventEmitter();

evproxy({ source: source, destination: dest });

dest.on('event', cb(function (arg) {
  console.log('got event');
  assert.equal(arg, 42);
}));

dest.on('next event', cb(function (arg0, arg1) {
  console.log('got next event');
  assert.equal(arg0, 1);
  assert.equal(arg1, -1);
}));

dest.on('foo', function () {
  assert(false);
});

source.emit('event', 42);
source.emit('next event', 1, -1);
