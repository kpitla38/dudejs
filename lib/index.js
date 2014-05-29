'use strict';

var Renderer = require('./utils/renderer');

function bootstrap(event, command){
    var renderer = new Renderer(command);
    event.on('error', function(data){
        renderer.error(data);
        process.exit(1);
    }).on('success', function(data){
        renderer.success(data);
    });
}

module.exports = {
    commands: require('./commands'),
    bootstrap: bootstrap
};