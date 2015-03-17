var americano = require('americano');

module.exports = {
    common: [
        americano.json(),
        americano.urlencoded(),
        americano.methodOverride(),
        americano.errorHandler({
            dumpExceptions: true,
            showStack: true
        }),
        americano.static(__dirname + '/../client/public', {
            maxAge: 86400000
        })
    ],
    development: [
        americano.logger('dev')
    ],
    production: [
        americano.logger('short')
    ]
};