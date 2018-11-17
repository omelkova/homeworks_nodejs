var http = require('http');
var url = require('url');
var config = require('./config');

var handlers = {
    hello: (data, callback) => {
        var message = "Welcome";
        if (typeof(data) == 'object' && data.queryString && data.queryString.name) {
            message = message + ", " + data.queryString.name;
        }
        callback(200, {"message": message})
    },
    notFound: (data, callback) => {callback(404)}
}

var router = {
    "hello": handlers.hello
}

var httpServer = http.createServer((req, res) => {
    var parsedUrl = url.parse(req.url, true);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var queryStringObject = parsedUrl.query;

    var data = {
        queryString: queryStringObject,
        trimmedPath: trimmedPath
    };

    var handler = trimmedPath in router ? router[trimmedPath] : handlers.notFound;

    handler(data, (statusCode, payload) => {
        if (typeof(statusCode) !== 'number') {
            statusCode = 200;
        };

        if (typeof(payload) !== 'object') {
            payload = {}
        };

        var payloadString = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log(trimmedPath, statusCode);
    });
});

httpServer.listen(config.port, () => {
    console.log("Starting HTTP server on port 3000");
});
