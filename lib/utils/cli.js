'use strict';

var mout = require('mout');
var chalk = require('chalk');
var renderer = require('./renderer');

var Cli = {
    read: function(args){
        return {
          commands: this.commands(args),
          options: this.options(args)
        };
    },
    commands: function(args){
        return mout.object.get(args, '_');
    },
    options: function(args){
        return mout.object.filter(args, function(v,k){return k != '_'});
    },
    renderer: function(command){
        return new renderer(command);
    },
    // Replace make and install methods to their
    // own files in the commands directory.
    // Make them return the event instance
    install: function(args, opts){
        var mp;
        if( ! opts.f && ! opts.b){
            console.log(chalk.red('Error: ') + 'Missing option (f|b)');
            return void 0;
        }
        if(opts.f) mp = 'frontend';
        if(opts.b) mp = 'backend';
        console.dir(args.split(' '));
        mout.array.forEach(args.split(' '), function(val){
            console.log('Installing ' + mp + ' module ' + val);
        });
    }
};

module.exports = Cli;