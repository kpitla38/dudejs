'use strict';

var fs = require('fs');
var path = require('path');
var error = require('../utils/error');
var Logger = require('../utils/logger');

function help(name){
    var json;
    var logger = new Logger();
    if(name){
        json = path.resolve(__dirname, '../../templates/json/' + name + '.json');
    } else {
        json = path.resolve(__dirname, '../../templates/json/help.json');
    }

    fs.exists(json, function (exists) {
        if (!exists) {
            return logger.emit('error', error('Unknown command: ' + name, 'EUNKNOWNCMD', {
                command: name
            }));
        }

        try {
            json = require(json);
        } catch (error) {
            return logger.emit('error', error);
        }

        logger.emit('success', json);
    });

    return logger;
}

module.exports = help;