const FASTLY_API_BASE = 'https://api.fastly.com';

const stringifyBody = body => {
    if (typeof body === 'undefined') return;
    return JSON.stringify(body);
};

const parseBody = async response => {
    const text = await response.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

const createError = (method, url, statusCode, responseBody) => {
    const details = responseBody ? `: ${responseBody}` : '';
    const error = new Error(`Fastly API ${method} ${url} failed with status ${statusCode}${details}`);
    error.statusCode = statusCode;
    error.responseBody = responseBody;
    return error;
};

const requestJson = async (apiKey, method, url, body) => {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Fastly-Key': apiKey
        }
    };
    if (typeof body !== 'undefined') {
        options.body = stringifyBody(body);
        options.headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(`${FASTLY_API_BASE}${url}`, options);
    const responseBody = await parseBody(response);
    if (!response.ok) {
        throw createError(method, url, response.status, typeof responseBody === 'string' ?
            responseBody : JSON.stringify(responseBody));
    }
    return responseBody;
};

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 *
 * @param {string} API key
 * @param {string} Service id
 */
module.exports = function (apiKey, serviceId) {
    const fastly = {
        serviceId
    };

    /*
     * Helper method for constructing Fastly API urls
     *
     * @param {string} Service id
     * @param {number} Version
     *
     * @return {string}
     */
    fastly.getFastlyAPIPrefix = function (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    };

    /*
     * Request helper used by the Fastly service mutators below.
     *
     * @param {string} Method
     * @param {string} URL
     * @param {object|Function} Body or callback
     * @param {Function} Callback
     */
    fastly.request = function (method, url, body, cb) {
        if (typeof body === 'function') {
            cb = body;
            body = void 0;
        }
        requestJson(apiKey, method, url, body)
            .then(response => cb(null, response))
            .catch(error => cb(error));
    };

    /*
     * getLatestActiveVersion: Get the most recent version for the configured service
     *
     * @param {callback} Callback with signature *err, latestVersion)
     */
    fastly.getLatestActiveVersion = function (cb) {
        if (!this.serviceId) {
            return cb(new Error('Failed to get latest version. No serviceId configured'));
        }
        const url = `/service/${encodeURIComponent(this.serviceId)}/version`;
        this.request('GET', url, (err, versions) => {
            if (err) {
                return cb(new Error(`Failed to fetch versions: ${err.message}`));
            }
            const latestVersion = versions.reduce((latestActiveSoFar, cur) => {
                // If one of [latestActiveSoFar, cur] is active and the other isn't,
                // return whichever is active. If both are not active, return
                // latestActiveSoFar.
                if (!cur || !cur.active) return latestActiveSoFar;
                if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                // When both are active, prefer whichever has a higher version number.
                return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
            }, null);
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
            return cb(new Error('Failed to set condition. No serviceId configured'));
        }
        const name = condition.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition`;
        return this.request('PUT', putUrl, condition, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, condition, (e, resp) => {
                    if (e) {
                        return cb(new Error(`Failed while inserting condition "${condition.statement}": ${e.message}`));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update condition "${condition.statement}": ${err.message}`));
            }
            return cb(null, response);
        });
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
            return cb(new Error('Failed to set header. No serviceId configured'));
        }
        const name = header.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header`;
        return this.request('PUT', putUrl, header, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, header, (e, resp) => {
                    if (e) {
                        return cb(new Error(`Failed to insert header: ${e.message}`));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update header: ${err.message}`));
            }
            return cb(null, response);
        });
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
            return cb(new Error('Failed to set response object. No serviceId configured'));
        }
        const name = responseObj.name;
        const putUrl =
            `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        return this.request('PUT', putUrl, responseObj, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, responseObj, (e, resp) => {
                    if (e) {
                        return cb(new Error(`Failed to insert response object: ${e.message}`));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update response object: ${err.message}`));
            }
            return cb(null, response);
        });
    };

    /*
     * cloneVersion: Clone a version to create a new version
     *
     * @param {number} Version to clone
     * @param {callback} Callback for fastly.request
     */
    fastly.cloneVersion = function (version, cb) {
        if (!this.serviceId) return cb(new Error('Failed to clone version. No serviceId configured.'));
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    };

    /*
     * activateVersion: Activate a version
     *
     * @param {number} Version number
     * @param {callback} Callback for fastly.request
     */
    fastly.activateVersion = function (version, cb) {
        if (!this.serviceId) return cb(new Error('Failed to activate version. No serviceId configured.'));
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
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
            return cb(new Error('Failed to set response object. No serviceId configured'));
        }

        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl/${name}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl`;
        const content = {content: vcl};
        return this.request('PUT', url, content, (err, response) => {
            if (err && err.statusCode === 404) {
                content.name = name;
                this.request('POST', postUrl, content, (e, resp) => {
                    if (e) {
                        return cb(new Error(`Failed while adding custom vcl "${name}": ${e.message}`));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update custom vcl "${name}": ${err.message}`));
            }
            return cb(null, response);
        });
    };

    /*
     * Purge all content associated with a surrogate key.
     *
     * @param {string}   serviceId service id
     * @param {string}   key surrogate key
     * @param {Function} cb callback
     */
    fastly.purgeKey = function (targetServiceId, key, cb) {
        if (!targetServiceId) return cb(new Error('Failed to purge key. No serviceId configured.'));
        const url = `/service/${encodeURIComponent(targetServiceId)}/purge/${encodeURIComponent(key)}`;
        this.request('POST', url, cb);
    };

    return fastly;
};
