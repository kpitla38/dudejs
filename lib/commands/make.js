'use strict';

var fs = require('fs');
var path = require('path');
var bars = require('handlebars');
var wrench = require('wrench');
var eventbus = require('events').EventEmitter;
var error = require('../utils/error');

function make(name){
    name = name || '';
    var event = new eventbus();
    var app = path.join(process.cwd(), '/', name);
    var fr = path.join(__dirname, '../../templates/framework');
    var tokens = {
        name: name
    };
    fs.exists(app, function(exists){
        if(!exists){
//            console.log('Crafting your application...');
            event.emit('log', 'Crafting your application...');
            wrench.copyDirSyncRecursive(fr, app);
            wrench.readdirSyncRecursive(app).forEach(function(file){
                var fp = path.join(app, file);
                if(fs.statSync(fp).isFile()) {
                    var contents = fs.readFileSync(fp, {encoding: 'utf8'}).toString();
                    var template = bars.compile(contents);
                    fs.writeFileSync(fp, template(tokens));
                }
            });
            event.emit('success', {"name": name});
        } else {
            if(app === path.join(process.cwd(), '/')){
                return event.emit('error', error('Invalid name', 'EINVNAME', {}));
            }
            return event.emit('error', error('Directory with name ' + name + ' already exists', 'EDUPLDIR', {}));
        }
    });

    return event;
}

module.exports = make;