'use strict';

var path = require('path'),
    chalk = require('chalk');

var Helper = {
    json: function(name){
        var fp;
        if(name !== undefined && name){
            var file = '../../templates/json/' + name + '.json';
            fp = path.resolve(__dirname, file);
        } else {
            fp = path.resolve(__dirname, '../../templates/json/help.json');
        }
        try{
            var json = require(fp);
        } catch(error){
            console.log(chalk.red('Error:  ') + 'Unrecognized command ' + name);
            process.exit(0);
        }

        return json;
    },
    commands: function(){
        return this.json().commands;
    }
};

module.exports = Helper;