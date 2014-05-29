'use strict';

var mout = require('mout');
var chalk = require('chalk');
var template = require('./template');

function Renderer(command){
    this._command = command;
}

Renderer.prototype.error = function(err){
    var str = 'dude ' + err.code + ' ' + mout.string.lpad(err.message, 10, '-');
    console.log(str);
};

Renderer.prototype.log = function(data, level){
    if(!(typeof(data) === 'object')){
        console.log(data);
    } else {
        console.log(data.msg);
    }
};

Renderer.prototype.success = function(data){
    var method = '_' + this._command;
    if(this[method]){
        this[method](data);
    }
};

Renderer.prototype._help = function(data){
    if (!data.command) {
        console.log(template.render('help.bars', data, false));
    } else {
        console.log(template.render('help-generic.bars', data, false));
    }
};

Renderer.prototype._new = function(data){
    // Use data here
    console.log('Application created. Go build something beautiful');
};

module.exports = Renderer;
