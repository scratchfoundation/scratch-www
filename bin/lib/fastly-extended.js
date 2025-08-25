const Fastly = require('fastly');

/**
 * The custom `Error` object reported by the Fastly library's implementation of `request`
 * includes an HTTP status code when an HTTP failure occurs.
 * @typedef {Error & { statusCode: number }} FastlyRequestError
 */

/**
 * Node-style callback reporting an error
 * @callback FastlyErrorCallback
 * @param {!string} err - Error object or null if no error occurred. TODO: this should be `Error` in the future.
 * @param {unknown} [ignored] - The result of the operation, ignored due to error.
 * @returns {void}
 */

/**
 * Node-style callback reporting a successful result
 * @template T
 * @callback FastlyResultCallback
 * @param {null|undefined} ignored - The error object, which should be null or undefined if no error occurred.
 * @param {T} result - The result of the operation.
 * @returns {void}
 */

/**
 * Node-style callback for Fastly requests
 * @template T
 * @typedef {FastlyErrorCallback & FastlyResultCallback<T>} FastlyCallback
 */

/* ******** Fastly data model ******** */
// Many of these objects have more fields than shown here.
// See here for details: https://www.fastly.com/documentation/reference/api/

/**
 * @typedef {Object} FastlyServiceVersion
 * @property {number} number Version number
 * @property {boolean} active Whether the version is active
 * @property {boolean} locked Whether the version is locked
 */

/**
 * @typedef {Object} FastlyVclCondition
 * @property {string} name Condition name
 * @property {string} statement Condition VCL statement
 */

/**
 * @typedef {'set' | 'append' | 'delete' | 'regex' | 'regex_repeat'} FastlyHeaderAction
 */

/**
 * @typedef {Object} FastlyVclHeader
 * @property {string} name Header name
 * @property {FastlyHeaderAction} action Header action
 */

/**
 * @typedef {Object} FastlyVclLintReport
 * @property {Array<string>} errors List of linting errors found
 * @property {Array<string>} warnings List of linting warnings found
 */

/**
 * @typedef {Object} FastlyVclResponseObject
 * @property {string} name Response object name
 * @property {string} request_condition Request condition name
 * @property {number} status HTTP status code
 * @property {string} response Response body
 */

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 */
module.exports = function (/** @type {string} */ apiKey, /** @type {string} */ serviceId) {
    const fastly = Fastly(apiKey);
    fastly.serviceId = serviceId;

    /**
     * Helper method for constructing Fastly API urls
     * @param {string} servId - Fastly service ID
     * @param {number} version - Fastly service version
     * @return {string} Fastly API url prefix
     */
    fastly.getFastlyAPIPrefix = function (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    };

    /**
     * getLatestActiveVersion: Get the most recent version for the configured service
     * @param {FastlyCallback<FastlyServiceVersion?>} cb - Callback for the latest active version
     * @returns {void}
     */
    fastly.getLatestActiveVersion = function (cb) {
        if (!this.serviceId) {
            return cb('Failed to get latest version. No serviceId configured');
        }
        const url = `/service/${encodeURIComponent(this.serviceId)}/version`;
        this.request('GET', url, (/** @type {Error} */ err, /** @type {FastlyServiceVersion[]} */ versions) => {
            if (err) {
                return cb(`Failed to fetch versions: ${err}`);
            }
            const latestVersion = versions.reduce((latestActiveSoFar, cur) => {
                // if one of [latestActiveSoFar, cur] is active and the other isn't,
                // return whichever is active. If both are not active, return
                // latestActiveSoFar.
                if (!cur || !cur.active) return latestActiveSoFar;
                if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                // when both are active, prefer whichever has a higher version number.
                return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
            }, /** @type {FastlyServiceVersion?} */ (null));
            return cb(null, latestVersion);
        });
    };

    /**
     * setCondition: Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {FastlyVclCondition} condition - Condition object sent to the API
     * @param {FastlyCallback<FastlyVclCondition>} cb - Callback returning the created or updated object on success
     * @returns {void}
     */
    fastly.setCondition = function (version, condition, cb) {
        if (!this.serviceId) {
            return cb('Failed to set condition. No serviceId configured');
        }
        const name = condition.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition`;
        return this.request('PUT', putUrl, condition,
            (/** @type {FastlyRequestError} */ err, /** @type {FastlyVclCondition} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, condition,
                        (/** @type {FastlyRequestError} */ e, /** @type {FastlyVclCondition} */ resp) => {
                            if (e) {
                                return cb(`Failed while inserting condition "${condition.statement}": ${e}`);
                            }
                            return cb(null, resp);
                        }
                    );
                    return;
                }
                if (err) {
                    return cb(`Failed to update condition "${condition.statement}": ${err}`);
                }
                return cb(null, response);
            }
        );
    };

    /**
     * setFastlyHeader: Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {FastlyVclHeader} header - Header object sent to the API
     * @param {FastlyCallback<FastlyVclHeader>} cb - Callback returning the created or updated object on success
     * @returns {void}
     */
    fastly.setFastlyHeader = function (version, header, cb) {
        if (!this.serviceId) {
            cb('Failed to set header. No serviceId configured');
        }
        const name = header.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header`;
        return this.request('PUT', putUrl, header,
            (/** @type {FastlyRequestError} */ err, /** @type {FastlyVclHeader} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, header,
                        (/** @type {FastlyRequestError} */ e, /** @type {FastlyVclHeader} */ resp) => {
                            if (e) {
                                return cb(`Failed to insert header: ${e}`);
                            }
                            return cb(null, resp);
                        }
                    );
                    return;
                }
                if (err) {
                    return cb(`Failed to update header: ${err}`);
                }
                return cb(null, response);
            }
        );
    };

    /**
     * setResponseObject: Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {object} responseObj - Response object sent to the API
     * @param {FastlyCallback<FastlyVclResponseObject>} cb - Callback returning the created or updated object on success
     * @returns {void}
     */
    fastly.setResponseObject = function (version, responseObj, cb) {
        if (!this.serviceId) {
            cb('Failed to set response object. No serviceId configured');
        }
        const name = responseObj.name;
        const putUrl =
            `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        return this.request('PUT', putUrl, responseObj,
            (/** @type {FastlyRequestError} */ err, /** @type {FastlyVclResponseObject} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, responseObj,
                        (/** @type {FastlyRequestError} */ e, /** @type {FastlyVclResponseObject} */ resp) => {
                            if (e) {
                                return cb(`Failed to insert response object: ${e}`);
                            }
                            return cb(null, resp);
                        }
                    );
                    return;
                }
                if (err) {
                    return cb(`Failed to update response object: ${err}`);
                }
                return cb(null, response);
            }
        );
    };

    /**
     * cloneVersion: Clone a version to create a new version
     *
     * @param {number} version - Version to clone
     * @param {FastlyCallback<FastlyServiceVersion>} cb - Callback returning the cloned version on success
     * @returns {void}
     */
    fastly.cloneVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to clone version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    };

    /**
     * activateVersion: Activate a version
     *
     * @param {number} version - Version to activate
     * @param {FastlyCallback<FastlyServiceVersion>} cb - Callback returning the activated version on success
     * @returns {void}
     */
    fastly.activateVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to activate version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
        this.request('PUT', url, cb);
    };

    /**
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version - Target version number for Fastly service
     * @param {string}   name    - Name of the custom vcl file to be upserted
     * @param {string}   vcl     - Stringified custom vcl to be uploaded
     * @param {FastlyCallback<FastlyVclLintReport>} cb - Callback returning the lint report on success
     * @returns {void}
     */
    fastly.setCustomVCL = function (version, name, vcl, cb) {
        if (!this.serviceId) {
            return cb('Failed to set response object. No serviceId configured');
        }

        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl/${name}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl`;
        const content = {content: vcl};
        return this.request('PUT', url, content,
            (/** @type {FastlyRequestError} */ err, /** @type {FastlyVclLintReport} */ response) => {
                if (err && err.statusCode === 404) {
                    content.name = name;
                    this.request('POST', postUrl, content,
                        (/** @type {FastlyRequestError} */ e, /** @type {FastlyVclLintReport} */ resp) => {
                            if (e) {
                                return cb(`Failed while adding custom vcl "${name}": ${e}`);
                            }
                            return cb(null, resp);
                        }
                    );
                    return;
                }
                if (err) {
                    return cb(`Failed to update custom vcl "${name}": ${err}`);
                }
                return cb(null, response);
            }
        );
    };

    return fastly;
};
