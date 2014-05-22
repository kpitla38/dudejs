'use strict';

var template = require('./template');

var Renderer = {
    error: function(err){
        var str = err.code + ' ' + err.message;
        console.log(str);
    },
    success: function(data){
        if (!data.command) {
            console.log(template.render('help.bars', data, false));
        } else {
            console.log(template.render('help-generic.bars', data));
        }
    }
};

module.exports = Renderer;
