'use strict';

var fs = require('fs');
var path = require('path');
var error = require('../utils/error');
var eventbus = require('../utils/eventbus');

function help(name){
    var json;
    var event = new eventbus();
    if(name){
        json = path.resolve(__dirname, '../../templates/json/' + name + '.json');
    } else {
        json = path.resolve(__dirname, '../../templates/json/help.json');
    }

    fs.exists(json, function (exists) {
        if (!exists) {
            return event.emit('error', error('Unknown command: ' + name, 'EUNKNOWCMD', {
                command: name
            }));
        }

        try {
            json = require(json);
        } catch (error) {
            return event.emit('error', error);
        }

        event.emit('success', json);
    });

    return event;
}

module.exports = help;