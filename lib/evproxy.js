var EventEmitter = require('events').EventEmitter;

module.exports = function (options) {
  var source = options.source,
      dest = options.destination;

  dest.on('newListener', function (event) {
    source.on(event, function () {
      // Still seems to be the fastes way:
      var args = arguments.length === 1
        ? [ arguments[0] ]
        : Array.apply(null, arguments);

      args.unshift(event);
      EventEmitter.prototype.emit.apply(dest, args);
    });
  });
};
