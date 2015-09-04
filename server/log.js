var bunyan = require('bunyan');

module.exports = function () {
    var logger = bunyan.createLogger({
        name: 'www',
        serializers: {req: bunyan.stdSerializers.req}
    });
    
    return function (req, res, next) {
        req.log = logger;
        req.log.info({req: req});
        next();
    };
};
