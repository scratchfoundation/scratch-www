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
    fastly.getFastlyAPIPrefix = function (servId, version) {
        return '/service/' + encodeURIComponent(servId) + '/version/' + version;
    };

    /*
     * getLatestActiveVersion: Get the most recent version for the configured service
     *
     * @param {callback} Callback with signature *err, latestVersion)
     */
    fastly.getLatestActiveVersion = function (cb) {
        if (!this.serviceId) {
            return cb('Failed to get latest version. No serviceId configured');
        }
        var url = '/service/' + encodeURIComponent(this.serviceId) + '/version';
        this.request('GET', url, function (err, versions) {
            if (err) {
                return cb('Failed to fetch versions: ' + err);
            }
            var latestVersion = versions.reduce(function (lateVersion, version) {
                if (!lateVersion) return version;
                // if versions we're comparing are both active, or both inactive, prefer
                // whichever has a higher version number
                if (lateVersion.active === version.active) {
                    if (version.number > lateVersion.number) return version;
                    return lateVersion;
                }
                // if only one of the versions is active, prefer that one
                if (version.active === true) return version;
                return lateVersion;
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
                this.request('POST', postUrl, condition, function (e, resp) {
                    if (e) {
                        return cb('Failed while inserting condition "' + condition.statement + '": ' + e);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb('Failed to update condition "' + condition.statement + '": ' + err);
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
                this.request('POST', postUrl, header, function (e, resp) {
                    if (e) {
                        return cb('Failed to insert header: ' + e);
                    }
                    return cb(null, resp);
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
                this.request('POST', postUrl, responseObj, function (e, resp) {
                    if (e) {
                        return cb('Failed to insert response object: ' + e);
                    }
                    return cb(null, resp);
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

    /*
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version current version number for fastly service
     * @param {string}   name    name of the custom vcl file to be upserted
     * @param {string}   vcl     stringified custom vcl to be uploaded
     * @param {Function} cb      function that takes in two args: err, response
     */
    fastly.setCustomVCL = function (version, name, vcl, cb) {
        if (!this.serviceId) {
            return cb('Failed to set response object. No serviceId configured');
        }

        var url = this.getFastlyAPIPrefix(this.serviceId, version) + '/vcl/' + name;
        var postUrl = this.getFastlyAPIPrefix(this.serviceId, version) + '/vcl';
        var content = {content: vcl};
        return this.request('PUT', url, content, function (err, response) {
            if (err && err.statusCode === 404) {
                content.name = name;
                this.request('POST', postUrl, content, function (e, resp) {
                    if (e) {
                        return cb('Failed while adding custom vcl "' + name + '": ' + e);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb('Failed to update custom vcl "' + name + '": ' + err);
            }
            return cb(null, response);
        }.bind(this));
    };

    return fastly;
};
