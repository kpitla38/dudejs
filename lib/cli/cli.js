'use strict';

var _ = require('lodash'),
    utils = require('../util/util'),
    helper = require('../help/helper');

var pkg = utils.getPackagePath();

var Cli = {
    parse: function(command){
        return utils.parse(helper.commands().commands, command);
    },
    commands: function(args){
        return args._;
    },
    options: function(args){
        return _.omit(args, '_');
    },
    version: function(){
        console.log('v'+pkg.version);
    },
    help: function(command){
        if(!command && !this.parse(command)) {
            var arg = "See `dude help <command>` for more information on a command";
            utils.render(helper.commands(), arg);
        } else {
            utils.render(helper.commands(command));
        }
    },
    make: function(name){
        console.log('Crafting your application ' + name + '...');
        console.log('Application created. Go build something amazing !');
    },
    install: function(args, opts){
        var mp;
        if( ! opts.f && ! opts.b){
            console.log('Missing option (f|b)');
            return void 0;
        }
        if(opts.f) mp = 'frontend';
        if(opts.b) mp = 'backend';
        console.log('Installing ' + mp + ' module ' + args);
    }
};

module.exports = Cli;