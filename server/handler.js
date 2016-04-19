/**
 * Constructor
 */
function Handler (route) {
    var url = '/' + route.view + '.html';

    return function (req, res, next) {
        req.url = url;
        next();
    };
}

/**
 * Export a new instance
 */
module.exports = function (route) {
    return new Handler(route);
};
