/**
 * routes
 * @author keven
 * @type {[type]}
 */
var routes = require('./lib/routes');
module.exports = function (app) {
    'use strict';
    app.get('/', routes.homepage);
    app.get(/\/([\w\W\-\_]+)(\.[shtml|html|htm|php|jade])?/i, routes.getHtml);
    app.get('/*', routes.homepage);
    app.post('/*', routes.sendJson);
    app.use(function (req, res, next) {
        var err = new Error ('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        if (req.xhr) {
            res.status(err.status || 404).set('Content-type', 'application/json');
            res.send({
                status: err.status || 404,
                code: 1,
                message: err.message || 'Not Found'
            });
        } else {
            var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><div style="text-align: center;font-size: 30px;">Welcome to use aptl-route!</div></body></html>';
            res.writeHead(200, {'Content-type' : 'text/html'});
            res.write(html);
            res.end();
        }
    });
};
