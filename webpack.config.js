var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var gitsha = require('git-bundle-sha');
var MustacheRendererPlugin = require('./mustache-renderer-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var routes = require('./src/routes.json');

var VersionPlugin = function (options) {
    this.options = options || {};
    return this;
};
VersionPlugin.prototype.apply = function (compiler) {
    var addVersion = function (compilation, versionId, callback) {
        compilation.assets['version.txt'] = {
            source: function () {return versionId;},
            size: function () {return versionId.length;}
        };
        callback();
    };
    var plugin = this;
    compiler.plugin('emit', function (compilation, callback) {
        var sha = process.env.WWW_VERSION;
        if (!sha) {
            gitsha(plugin.options, function (err, sha) {
                if (err) return callback(err);
                return addVersion(compilation, sha, callback);
            });
        } else {
            return addVersion(compilation, sha, callback);
        }
    });
};

// Prepare all entry points
var entry = {
    common: [
        // Polyfills
        './polyfill/b64.min.js',
        './polyfill/custom-event.min.js',
        './polyfill/es5-shim.min.js',
        './polyfill/intl.min.js',
        './polyfill/match-media.min.js',
        // Vendor
        'raven-js',
        'react',
        'react-dom',
        'react-intl',
        'redux',
        // Init
        './src/init.js'
    ]
};
routes.forEach(function (route) {
    if (!route.redirect) {
        entry[route.name] = './src/views/' + route.view + '.jsx';
    }
});

// Config
module.exports = {
    entry: entry,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss-loader!sass'
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer({browsers: ['last 3 versions']})];
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new VersionPlugin({length: 5}),
        new MustacheRendererPlugin({
            templatePath: path.resolve(__dirname, './src/template.html'),
            routes: routes,
            config: require('./src/template-config.js')
        }),
        new CopyWebpackPlugin([
            {from: 'static'},
            {from: 'intl', to: 'js'}
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || 'development') + '"',
            'process.env.SENTRY_DSN': '"' + (process.env.SENTRY_DSN || '') + '"'
        }),
        new webpack.optimize.CommonsChunkPlugin('common', 'js/common.bundle.js'),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};
