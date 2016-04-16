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
        if (!this.serviceId) {
            console.error('Failed to get latest version.');
            return cb('No serviceId configured');
        }
        var url = '/service/'+ encodeURIComponent(this.serviceId) +'/version';
        this.request('GET', url, function (err, versions) {
            if (err) {
                console.error('Failed to get versions', err);
                return cb(err);
            }
            var latestVersion = versions.reduce(function (latestVersion, version) {
                if (!latestVersion) return version;
                if (version.number > latestVersion.number) return version;
                return latestVersion;
            });
            return cb(null, latestVersion);
        });    
    };

    fastly.setCondition = function (version, condition, cb) {
        if (!this.serviceId) {
            console.error('Failed to set condition', condition);
            return cb('No serviceId configured');
        }
        var name = condition.name;
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition';
        return this.request('PUT', putUrl, condition, function (err, response) {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, condition, function (err, response) {
                    if (err) {
                        console.log('Failed to POST header', header);
                        return cb(err);
                    }
                    return cb(null, response);
                });
                return;
            }
            if (err) {
                console.error('Failed to PUT condition', condition);
                return cb(err);
            }
            return cb(null, response);
        }.bind(this));
    };

    fastly.setFastlyHeader = function (version, header, cb) {
        if (!this.serviceId) {
            console.error('Failed to set header', header);
            cb('No serviceId configured');
        }
        var name = header.name;
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header';
        return this.request('PUT', putUrl, header, function (err, response) {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, header, function (err, response) {
                    if (err) {
                        console.error('Failed to POST header', header);
                        return cb(err);
                    }
                    return cb(null, response);
                });
                return;
            }
            if (err) {
                console.error('Failed to PUT header', header);
                return cb(err);
            }
            return cb(null, response);
        }.bind(this));
    };
    return fastly;
};
