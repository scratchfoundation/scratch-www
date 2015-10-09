var bunyan = require('bunyan');

var Logger = bunyan.createLogger({name: 'scratch-www'});
module.exports = Logger;
