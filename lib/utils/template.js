'use strict';
var path = require('path'),
    fs = require('fs'),
    bars = require('handlebars'),
    mout = require('mout'),
    helpers = require('../../templates/helpers');

var templatesDir = path.resolve(__dirname, '../../templates/bars');
var cache = {};

// Register helpers
mout.object.forOwn(helpers, function (register) {
    register(bars);
});

function render(name, data, escape) {
    var contents;

    // Check if already compiled
    if (cache[name]) {
        return cache[name](data);
    }

    // Otherwise, read the file, compile and cache
    contents = fs.readFileSync(path.join(templatesDir, name)).toString();
    cache[name] = bars.compile(contents, {
        noEscape: !escape
    });

    if(!escape) return render(name, data, false);
    // Call the function again
    return render(name, data, escape);
}

function exists(name) {
    // return true if content exists in cache
    if (cache[name]) {
        return true;
    }

    return fs.existsSync(path.join(templatesDir, name));
}

module.exports = {
    render: render,
    exists: exists
};