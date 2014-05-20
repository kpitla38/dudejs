'use strict';

var _ = require('lodash'),
    path = require('path');

var Utils = {
    getPackagePath: function(){
        return require(path.join(path.resolve(__dirname, '../../'), 'package.json'));
    },
    parse: function(commands, command){
        return _(commands).has(command);
    },
    padLength: function(list){
        return Math.max.apply(Math, _.map(list, function (el) { return el.length }));
    },
    rpad: function(str, len){
        var m = len - str.length;
        for(var i=0; i< m; i++){
            str = str + ' ';
        }
        return str;
    },
    lpad: function(str, len){
        for(var i=0; i<len; i++){
            str = ' ' + str;
        }
        return str;
    },
    render: function(json, arg){
        var self = this;
        var msg = [];
        var max = this.padLength((_.keys(json)));
        _(json).each(function(v,k){
            if(_.isString(v)){
                if(k == "Description"){
                    msg.push('',  self.lpad(k, 2) + self.lpad(':', 0));
                    msg.push('', self.lpad(v, 4));
                } else {
                    msg.push('',  self.lpad(k, 2) + self.lpad(':', 0) + self.lpad(v, 2));
                }
            }
            if(_.isObject(v)){
                if(_.isEmpty(v)){
                    return void 0;
                }
                msg.push('', self.lpad(k,2) + self.lpad(':',0), '');
                _(v).each(function(nv, nk){
                   msg.push(self.lpad(self.rpad(nk, max), 4) + self.lpad(nv, 4));
                });
            }
        });
        if(!_.isUndefined(arg)){
            msg.push('', self.lpad(arg, 2), '');
        }
        console.log(msg.join('\n'));
    }
};

module.exports = Utils;