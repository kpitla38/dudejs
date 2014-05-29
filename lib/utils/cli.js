'use strict';

var mout = require('mout');
var chalk = require('chalk');
var pkg = require('../../package.json');
var renderer = require('./renderer');

var Cli = {
    read: function(args){
        return {
          commands: this.commands(args),
          options: this.options(args)
        };
    },
    renderer: function(command){
        return new renderer(command);
    },
    commands: function(args){
        return mout.object.get(args, '_');
    },
    options: function(args){
        return mout.object.filter(args, function(v,k){return k != '_'});
    },
    // Replace make and install methods to their
    // own files in the commands directory.
    // Make them return the event instance
    make: function(name){
        if(name && name != undefined){
            console.log('Crafting your application ' + name + '...');
            console.log('Application created. Go build something amazing !');
        }else{
            console.log('Please enter your application name');
        }
    },
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