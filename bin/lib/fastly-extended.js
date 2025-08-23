const Fastly = require('fastly');
const {fastlyMockRequest, mockServiceId} = require('./fastly-mock-request.js');

/**
 * @typedef {Object} OptionalStatusCode
 * @property {number=} statusCode HTTP status code
 */

/**
 * @typedef {Error & OptionalStatusCode} FastlyError
 */

/**
 * @template T
 * @callback FastlyRequestCallback A Fastly API request callback
 * @param {FastlyError?} err Error object, iff an error occurred
 * @param {T=} response Response object, iff no error occurred
 * @returns {void}
 */

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 */
class FastlyExtended {

    /**
     * @param {string} apiKey Fastly API key
     * @param {*} serviceId Fastly service ID
     */
    constructor (apiKey, serviceId) {
        this.fastly = Fastly(apiKey);
        this.serviceId = serviceId;

        if (serviceId === mockServiceId) {
            console.log(`Fastly Service ID is "${mockServiceId}" so Fastly requests will be simulated and logged.`);
            this.fastly.request = fastlyMockRequest;
        }

        /**
         * @type {{
         *  (
         *      httpMethod: string, url: string, callback: FastlyRequestCallback<any>
         *  ): void;
         *  (
         *      httpMethod: string, url: string, formData: Record.<string,any>, callback: FastlyRequestCallback<any>
         *  ): void;
         * }}
         */
        this.request = this.fastly.request.bind(this.fastly);
    }

    /**
     * Helper method for constructing Fastly API urls
     *
     * @param {string} servId Service id
     * @param {number} version Version
     *
     * @return {string} Fastly API URL prefix for the given service and version
     */
    getFastlyAPIPrefix (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    }

    /**
     * @typedef {Object} ServiceVersion
     * @property {number} number Version number
     * @property {boolean} active Whether the version is active
     * @property {boolean} locked Whether the version is locked
     */
    /**
     * Get the most recent version for the configured service
     *
     * @param {FastlyRequestCallback<ServiceVersion>} cb Callback for error or latest version info
     * @returns {void}
     */
    getLatestActiveVersion (cb) {
        if (!this.serviceId) {
            return cb(new Error('Failed to get latest version. No serviceId configured'));
        }
        const url = `/service/${encodeURIComponent(this.serviceId)}/version`;
        this.request('GET', url, (err, versions) => {
            if (err) {
                return cb(new Error('Failed to fetch versions', {cause: err}));
            }
            const latestVersion = versions.reduce((latestActiveSoFar, cur) => {
                // if one of [latestActiveSoFar, cur] is active and the other isn't,
                // return whichever is active. If both are not active, return
                // latestActiveSoFar.
                if (!cur || !cur.active) return latestActiveSoFar;
                if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                // when both are active, prefer whichever has a higher version number.
                return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
            }, null);
            return cb(null, latestVersion);
        });
    }

    /**
     * Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} condition Condition object sent to the API
     * @param {FastlyRequestCallback<unknown>} cb Callback for error or response body
     * @returns {void}
     */
    setCondition (version, condition, cb) {
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
                        return cb(new Error(`Failed while inserting condition "${condition.statement}"`, {cause: e}));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update condition "${condition.statement}"`, {cause: err}));
            }
            return cb(null, response);
        });
    }

    /**
     * Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} header Header object sent to the API
     * @param {FastlyRequestCallback<unknown>} cb Callback for error or response body
     * @returns {void}
     */
    setFastlyHeader (version, header, cb) {
        if (!this.serviceId) {
            cb(new Error('Failed to set header. No serviceId configured'));
        }
        const name = header.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header`;
        return this.request('PUT', putUrl, header, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, header, (e, resp) => {
                    if (e) {
                        return cb(new Error('Failed to insert header', {cause: e}));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error('Failed to update header', {cause: err}));
            }
            return cb(null, response);
        });
    }

    /**
     * Get response objects for a specific version
     * @param {number} version The version number of the Fastly service
     * @param {FastlyRequestCallback<object>} cb Callback for error or response body
     * @returns {void}
     */
    getResponseObjects (version, cb) {
        if (!this.serviceId) {
            return cb(new Error('Failed to get response objects. No serviceId configured.'));
        }
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        this.request('GET', url, cb);
    }

    /**
     * Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} responseObj Response object sent to the API
     * @param {FastlyRequestCallback<unknown>} cb Callback for error or response body
     * @returns {void}
     */
    setResponseObject (version, responseObj, cb) {
        if (!this.serviceId) {
            cb(new Error('Failed to set response object. No serviceId configured'));
        }
        const name = responseObj.name;
        const putUrl =
            `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        return this.request('PUT', putUrl, responseObj, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, responseObj, (e, resp) => {
                    if (e) {
                        return cb(new Error('Failed to insert response object', {cause: e}));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error('Failed to update response object', {cause: err}));
            }
            return cb(null, response);
        });
    }

    /**
     * Clone a version to create a new version
     *
     * @param {number} version Version to clone
     * @param {FastlyRequestCallback<ServiceVersion>} cb Callback for error or response body
     * @returns {void}
     */
    cloneVersion (version, cb) {
        if (!this.serviceId) {
            return cb(new Error('Failed to clone version. No serviceId configured.'));
        }
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    }

    /**
     * Activate a version
     *
     * @param {number} version Version number
     * @param {FastlyRequestCallback<ServiceVersion>} cb Callback for error or response body
     * @returns {void}
     */
    activateVersion (version, cb) {
        if (!this.serviceId) {
            return cb(new Error('Failed to activate version. No serviceId configured.'));
        }
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
        this.request('PUT', url, cb);
    }

    /**
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version current version number for fastly service
     * @param {string}   name    name of the custom vcl file to be upserted
     * @param {string}   vcl     stringified custom vcl to be uploaded
     * @param {FastlyRequestCallback<unknown>} cb Callback for error or response body
     * @returns {void}
     */
    setCustomVCL (version, name, vcl, cb) {
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
                        return cb(new Error(`Failed while adding custom vcl "${name}"`, {cause: e}));
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(new Error(`Failed to update custom vcl "${name}")`, {cause: err}));
            }
            return cb(null, response);
        });
    }

    /**
     * Purge a surrogate key from Fastly's cache for a given service
     * @param {string} serviceId Fastly Service ID
     * @param {string} key Surrogate key to purge
     * @param {FastlyRequestCallback<unknown>} cb Callback for error or response body
     */
    purgeKey (serviceId, key, cb) {
        this.fastly.purgeKey(serviceId, key, cb);
    }
}

module.exports = (apiKey, serviceId) => new FastlyExtended(apiKey, serviceId);
