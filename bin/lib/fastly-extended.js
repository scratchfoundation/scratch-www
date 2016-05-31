var Fastly = require('fastly');

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 *
 * @param {string} API key
 * @param {string} Service id
 */
module.exports = function (apiKey, serviceId) {
    var fastly = Fastly(apiKey);
    fastly.serviceId = serviceId;

    /*
     * Helper method for constructing Fastly API urls
     *
     * @param {string} Service id
     * @param {number} Version
     *
     * @return {string}
     */
    fastly.getFastlyAPIPrefix = function (serviceId, version) {
        return '/service/' + encodeURIComponent(serviceId) + '/version/' + version;
    };

    /*
     * getLatestVersion: Get the most recent version for the configured service
     *
     * @param {callback} Callback with signature *err, latestVersion)
     */
    fastly.getLatestVersion = function (cb) {
        if (!this.serviceId) {
            return cb('Failed to get latest version. No serviceId configured');
        }
        var url = '/service/'+ encodeURIComponent(this.serviceId) +'/version';
        this.request('GET', url, function (err, versions) {
            if (err) {
                return cb('Failed to fetch versions: ' + err);
            }
            var latestVersion = versions.reduce(function (latestVersion, version) {
                if (!latestVersion) return version;
                if (version.number > latestVersion.number) return version;
                return latestVersion;
            });
            return cb(null, latestVersion);
        });
    };

    /*
     * setCondition: Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Condition object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setCondition = function (version, condition, cb) {
        if (!this.serviceId) {
            return cb('Failed to set condition. No serviceId configured');
        }
        var name = condition.name;
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/condition';
        return this.request('PUT', putUrl, condition, function (err, response) {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, condition, function (err, response) {
                    if (err) {
                        return cb('Failed while inserting condition \"' + condition.statement + '\": ' + err);
                    }
                    return cb(null, response);
                });
                return;
            }
            if (err) {
                return cb('Failed to update condition \"' + condition.statement + '\": ' + err);
            }
            return cb(null, response);
        }.bind(this));
    };

    /*
     * setFastlyHeader: Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Header object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setFastlyHeader = function (version, header, cb) {
        if (!this.serviceId) {
            cb('Failed to set header. No serviceId configured');
        }
        var name = header.name;
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/header';
        return this.request('PUT', putUrl, header, function (err, response) {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, header, function (err, response) {
                    if (err) {
                        return cb('Failed to insert header: ' + err);
                    }
                    return cb(null, response);
                });
                return;
            }
            if (err) {
                return cb('Failed to update header: ' + err);
            }
            return cb(null, response);
        }.bind(this));
    };

    /*
     * setResponseObject: Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Response object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setResponseObject = function (version, responseObj, cb) {
        if (!this.serviceId) {
            cb('Failed to set response object. No serviceId configured');
        }
        var name = responseObj.name;
        var putUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/response_object/' + encodeURIComponent(name);
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/response_object';
        return this.request('PUT', putUrl, responseObj, function (err, response) {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, responseObj, function (err, response) {
                    if (err) {
                        return cb('Failed to insert response object: ' + err);
                    }
                    return cb(null, response);
                });
                return;
            }
            if (err) {
                return cb('Failed to update response object: ' + err);
            }
            return cb(null, response);
        }.bind(this));
    };

    /*
     * cloneVersion: Clone a version to create a new version
     *
     * @param {number} Version to clone
     * @param {callback} Callback for fastly.request
     */
    fastly.cloneVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to clone version. No serviceId configured.');
        var url = this.getFastlyAPIPrefix(this.serviceId, version) + '/clone';
        this.request('PUT', url, cb);
    };

    /*
     * activateVersion: Activate a version
     *
     * @param {number} Version number
     * @param {callback} Callback for fastly.request
     */
    fastly.activateVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to activate version. No serviceId configured.');
        var url = this.getFastlyAPIPrefix(this.serviceId, version) + '/activate';
        this.request('PUT', url, cb);
    };

    return fastly;
};
