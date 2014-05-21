'use strict';

var mout = require('mout'),
    chalk = require('chalk'),
    utils = require('./utils'),
    helper = require('./help'),
    template = require('./template');

var pkg = utils.getPackagePath();

var Cli = {
    read: function(args){
        var nargs = require('minimist')(args, {'boolean': ['f', 'b']});
        return {
          commands: this.commands(nargs),
          options: this.options(nargs)
        };
    },
    parse: function(command){
        return utils.parse(helper.commands(), command);
    },
    commands: function(args){
        return mout.object.get(args, '_');
    },
    options: function(args){
        return mout.object.filter(args, function(v,k){return k != '_'});
    },
    version: function(){
        console.log('v'+pkg.version);
    },
    help: function(command){
        if(!command && !this.parse(command)) {
            console.log(template.render('help.bars', helper.json(), false));
        } else {
            console.log(template.render('help-generic.bars', helper.json(command)));
        }
    },
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