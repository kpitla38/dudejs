'use strict';

var mout = require('mout'),
    utils = require('../util/util'),
    helper = require('../help/helper');

var pkg = utils.getPackagePath();

var Cli = {
    read: function(args){
      var nargs = require('minimist')(args, {'boolean': ['f', 'b']});
      var commands = this.commands(nargs);
      var options = this.options(nargs);
      return {
          commands: commands,
          options: options
      };
    },
    parse: function(command){
        return utils.parse(helper.commands().commands, command);
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
            var arg = "See `dude help <command>` for more information on a command";
            utils.render(helper.commands(), arg);
        } else {
            utils.render(helper.commands(command));
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
            console.log('Missing option (f|b)');
            return void 0;
        }
        if(opts.f) mp = 'frontend';
        if(opts.b) mp = 'backend';
        console.log('Installing ' + mp + ' module ' + args);
    }
};

module.exports = Cli;