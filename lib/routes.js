var fs = require('fs'),
path = require('path');

exports.homepage = function(req, res, next) {
    try {
        res.render("index");
    } catch(err) {
        var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><div style="text-align: center;font-size: 30px;">Welcome to use aptl-route!</div></body></html>';
        res.writeHead(200, {'Content-type' : 'text/html'});
        res.write(html);
        res.end();
    }
};

exports.sendJson = function(req, res, next) {
    'use strict';
    var jsonDir = req.params[0], jsonName = req.params[1];
    res.set('Content-type', 'application/json');
    res.sendfile(path.join(__dirname, req.path));
};

exports.getHtml = function (req, res, next) {
    'use strict';
    var recursive = function (typeIdx) {
        var shownTypes = ['html', 'shtml', 'php', 'ejs', 'jade', 'htm'];
        var filename = req.params[1] ? req.params[0] + req.params[1] : req.params[0] + '.' + shownTypes[typeIdx], filepath = path.join('.', 'views', filename);
        if (typeIdx < shownTypes.length) {
            fs.exists(filepath, function (exists) {
                if (exists) {
                    res.render(filename, {
                        title: req.params[0]
                    });
                } else {
                    recursive(typeIdx + 1);
                }
            });
        } else {
            next();
        }
    };
    recursive(0);
};
