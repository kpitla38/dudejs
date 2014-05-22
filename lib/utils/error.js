'use strict';
var mout = require('mout');

function CustomError(msg, code, props) {
    var err = new Error(msg);
    err.code = code;

    if (props) {
        mout.object.mixIn(err, props);
    }

    return err;
}

module.exports = CustomError;