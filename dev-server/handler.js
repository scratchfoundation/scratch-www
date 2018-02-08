/*
 * Constructor
 */
const Handler = function (route) {
    // Handle redirects
    if (route.redirect) {
        return (req, res) => {
            res.redirect(route.redirect);
        };
    }

    var url = '/' + route.name + '.html';
    return function (req, res, next) {
        req.url = url;
        next();
    };
};

/*
 * Export a new instance
 */
module.exports = function (route) {
    return new Handler(route);
};
