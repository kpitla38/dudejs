'use strict';

var path = require('path');

var Helper = {
    json: function(name){
        var fp;
        if(name !== undefined && name){
            var file = '../help/' + name + '.json';
            fp = path.resolve(__dirname, file);
        } else {
            fp = path.resolve(__dirname, '../help/help.json');
        }
        var json = require(fp);
        return json;
    },
    commands: function(){
        return this.json().commands;
    }
};

module.exports = Helper;