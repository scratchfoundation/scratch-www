const Fastly = require('fastly');

/**
 * The custom `Error` object reported by the Fastly library's implementation of `request`
 * includes an HTTP status code when an HTTP failure occurs.
 * @typedef {Error & { statusCode: number }} FastlyRequestError
 */

/**
 * Node-style `(err, res)` callback. Success is reported by `err` being null or undefined.
 * @template Terr - The type of the error object. Usually `Error` or a subclass.
 * @template Tres - The type of the result object. Use `unknown` (not `any`) to "black box" the results.
 * @callback NodeStyleCallback
 * @param {Terr?} err - The error object. Set this if an error occurred.
 * @param {Tres} [result] - The result of the operation. Might be missing if `err` is set.
 * @returns {void}
 */

/**
 * Callback used by FastlyExtended
 * @template T - The type of the result object. Use `unknown` (not `any`) to "black box" the results.
 * @typedef {NodeStyleCallback<string, T>} FastlyExtCallback
 */

/**
 * Callback used by the Fastly library's implementation of `request`
 * @template T - The type of the result object. Use `unknown` (not `any`) to "black box" the results.
 * @typedef {NodeStyleCallback<FastlyRequestError, T>} FastlyReqCallback
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
 * @typedef {Object} FastlyVclHeader
 * @property {string} name Header name
 * @property {string} action Header action
 * @property {string} ignore_if_set If this is '1', the header will be ignored if it is already set
 * @property {string} type Header type
 * @property {string} dst Header to set
 * @property {string} src Variable to be used as a source for header content
 * @property {string} response_condition Response condition name
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
class FastlyExtended {
    /**
     * @param {string} apiKey - Fastly API key
     * @param {string} serviceId - Fastly service ID
     */
    constructor (apiKey, serviceId) {
        this.fastly = Fastly(apiKey);
        this.serviceId = serviceId;

        /**
         * @template T
         * @type {{
         *  (
         *      httpMethod: string, url: string, callback: FastlyReqCallback<any>
         *  ): void;
         *  (
         *      httpMethod: string, url: string, formData: Record.<string,any>, callback: FastlyReqCallback<any>
         *  ): void;
         * }}
         */
        this.request = this.fastly.request.bind(this.fastly);

        /**
         * @param {string} service - The Fastly service ID
         * @param {string} key - The cache key to purge
         * @param {FastlyReqCallback<void>} cb - Callback for when the purge request is complete
         * @returns {void}
         */
        this.purgeKey = this.fastly.purgeKey.bind(this.fastly);
    }

    /**
     * Helper method for constructing Fastly API urls
     * @param {string} servId - Fastly service ID
     * @param {number} version - Fastly service version
     * @return {string} Fastly API url prefix
     */
    getFastlyAPIPrefix (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    }

    /**
     * getLatestActiveVersion: Get the most recent version for the configured service
     * @param {FastlyExtCallback<FastlyServiceVersion?>} cb - Callback for the latest active version
     * @returns {void}
     */
    getLatestActiveVersion (cb) {
        if (!this.serviceId) {
            return cb('Failed to get latest version. No serviceId configured');
        }
        const url = `/service/${encodeURIComponent(this.serviceId)}/version`;
        this.request('GET', url,
            (/** @type {FastlyRequestError?} */ err, /** @type {FastlyServiceVersion[]} */ versions) => {
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
            }
        );
    }

    /**
     * setCondition: Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {FastlyVclCondition} condition - Condition object sent to the API
     * @param {FastlyExtCallback<FastlyVclCondition>} cb - Callback returning the created or updated object on success
     * @returns {void}
     */
    setCondition (version, condition, cb) {
        if (!this.serviceId) {
            return cb('Failed to set condition. No serviceId configured');
        }
        const name = condition.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition`;
        return this.request('PUT', putUrl, condition,
            (/** @type {FastlyRequestError?} */ err, /** @type {FastlyVclCondition} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, condition,
                        (/** @type {FastlyRequestError?} */ e, /** @type {FastlyVclCondition} */ resp) => {
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
    }

    /**
     * setFastlyHeader: Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {FastlyVclHeader} header - Header object sent to the API
     * @param {FastlyExtCallback<FastlyVclHeader>} cb - Callback returning the created or updated object on success
     * @returns {void}
     */
    setFastlyHeader (version, header, cb) {
        if (!this.serviceId) {
            cb('Failed to set header. No serviceId configured');
        }
        const name = header.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header`;
        return this.request('PUT', putUrl, header,
            (/** @type {FastlyRequestError?} */ err, /** @type {FastlyVclHeader} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, header,
                        (/** @type {FastlyRequestError?} */ e, /** @type {FastlyVclHeader} */ resp) => {
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
    }

    /**
     * setResponseObject: Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version - Fastly service's version number
     * @param {object} responseObj - Response object sent to the API
     * @param {FastlyExtCallback<FastlyVclResponseObject>} cb - Callback returning the created/updated object on success
     * @returns {void}
     */
    setResponseObject (version, responseObj, cb) {
        if (!this.serviceId) {
            cb('Failed to set response object. No serviceId configured');
        }
        const name = responseObj.name;
        const putUrl =
            `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        return this.request('PUT', putUrl, responseObj,
            (/** @type {FastlyRequestError?} */ err, /** @type {FastlyVclResponseObject} */ response) => {
                if (err && err.statusCode === 404) {
                    this.request('POST', postUrl, responseObj,
                        (/** @type {FastlyRequestError?} */ e, /** @type {FastlyVclResponseObject} */ resp) => {
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
    }

    /**
     * cloneVersion: Clone a version to create a new version
     *
     * @param {number} version - Version to clone
     * @param {FastlyExtCallback<FastlyServiceVersion>} cb - Callback returning the cloned version on success
     * @returns {void}
     */
    cloneVersion (version, cb) {
        if (!this.serviceId) return cb('Failed to clone version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    }

    /**
     * activateVersion: Activate a version
     *
     * @param {number} version - Version to activate
     * @param {FastlyExtCallback<FastlyServiceVersion>} cb - Callback returning the activated version on success
     * @returns {void}
     */
    activateVersion (version, cb) {
        if (!this.serviceId) return cb('Failed to activate version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
        this.request('PUT', url, cb);
    }

    /**
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version - Target version number for Fastly service
     * @param {string}   name    - Name of the custom vcl file to be upserted
     * @param {string}   vcl     - Stringified custom vcl to be uploaded
     * @param {FastlyExtCallback<FastlyVclLintReport>} cb - Callback returning the lint report on success
     * @returns {void}
     */
    setCustomVCL (version, name, vcl, cb) {
        if (!this.serviceId) {
            return cb('Failed to set response object. No serviceId configured');
        }

        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl/${name}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl`;
        const content = {content: vcl};
        return this.request('PUT', url, content,
            (/** @type {FastlyRequestError?} */ err, /** @type {FastlyVclLintReport} */ response) => {
                if (err && err.statusCode === 404) {
                    content.name = name;
                    this.request('POST', postUrl, content,
                        (/** @type {FastlyRequestError?} */ e, /** @type {FastlyVclLintReport} */ resp) => {
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
    }
}

module.exports = FastlyExtended;
