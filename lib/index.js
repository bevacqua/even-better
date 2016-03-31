// Load modules
var Monitor = require('./monitor');

// Declare internals
var internals = {};


exports.register = function (server, options, next) {
    var monitor;

    server.on('stop', stopping);
    reconfigure(options, next);

    server.expose('monitor', monitor);

    function reconfigure (options, next) {
        if (monitor) {
            monitor.stop();
            monitor.reconfigure = noop;
        }
        monitor = new Monitor(server, options);
        monitor.start(next || noop);
        monitor.reconfigure = reconfigure;
    }

    function stopping () {
        if (monitor) {
            monitor.stop();
        }
    }
};

function noop () {}

exports.register.attributes = {

    pkg: require('../package.json')
};
