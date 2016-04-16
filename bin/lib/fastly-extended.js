var Fastly = require('fastly');

module.exports = function (apiKey, serviceId) {
    var fastly = Fastly(apiKey);
    fastly.serviceId = serviceId;

    fastly.negateConditionStatement = function (statement) {
        return '!(' + statement + ')';
    };

    fastly.getFastlyAPIPrefix = function (serviceId, version) {
        return '/service/' + encodeURIComponent(serviceId) + '/version/' + version;
    };

    fastly.getLatestVersion = function (cb) {
        if (!this.serviceId) return cb('No serviceId configured');
        var url = '/service/'+ encodeURIComponent(this.serviceId) +'/version';
        this.request('GET', url, function (err, versions) {
            if (err) return cb(err);
            var latestVersion = versions.reduce(function (latestVersion, version) {
                if (!latestVersion) return version;
                if (version.number > latestVersion.number) return version;
                return latestVersion;
            });
            return cb(null, latestVersion);
        });    
    };

    fastly.setCondition = function (version, name, condition, cb) {
        if (!this.serviceId) return callback('No serviceId configured');
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition';
        return this.request('PUT', putUrl, condition, function (err, response) {
            if (err && err.statusCode === 404) return this.request('POST', postUrl, condition, cb);
            return cb(err, response);
        }.bind(this));
    };

    fastly.setHeader = function (version, name, header, cb) {
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header';
        return this.request('PUT', putUrl, header, function (err, response) {
            if (err && err.statusCode === 404) return this.request('POST', postUrl, header, cb);
            return cb(err, response);
        }.bind(this));
    };

    return fastly;
};
