'use strict';

var _ = require('lodash'),
    path = require('path');

var Utils = {
    getPackagePath: function(){
        return require(path.join(path.resolve(__dirname, '../../'), 'package.json'));
    },
    parse: function(commands, command){
        return _(commands).has(command);
    }
};

module.exports = Utils;