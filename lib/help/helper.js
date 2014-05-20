'use strict';

var _ = require('lodash'),
    path = require('path');

var Helper = {
    commands: function(name){
        var fp;
        if(!_.isUndefined(name) && name){
            var file = './' + name + '.json';
            fp = path.resolve(__dirname, file);
        } else {
            fp = path.resolve(__dirname, './help.json');
        }
        var json = require(fp);
        return json;
    }
};

module.exports = Helper;