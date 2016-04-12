var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var routes = require('./server/routes.json');


function HtmlGeneratorPlugin (options) {
    this.options = options;
    return this;
}

HtmlGeneratorPlugin.prototype.apply = function (compiler) {
    var render = this.options.render;
    var routes = this.options.routes;

    compiler.plugin('emit', function (compilation, callback) {
        var outputRoutes = {};
        routes.forEach(function (route) {
            var filename = route.view + '.html';
            var content = render(route);
            outputRoutes[route.pattern] = filename;
            compilation.assets[filename] = {
                source: function () {return content;},
                size: function () {return content.length;}
            };
        });
        var routeJson = JSON.stringify(outputRoutes);
        compilation.assets['routes.json'] = {
            source: function () {return routeJson;},
            size: function () {return routeJson.length;}
        };
        callback();
    });
};

// Prepare all entry points
var entry = {
    init: './src/init.js'
};
routes.forEach(function (route) {
    entry[route.view] = './src/views/' + route.view + '/' + route.view + '.jsx';
});

// Config
module.exports = {
    entry: entry,
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react/addons': 'React',
        'react-dom': 'ReactDOM',
        'react-intl': 'ReactIntl',
        'redux': 'Redux'
    },
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
        new HtmlGeneratorPlugin({
            render: require('./server/render.js'),
            routes: routes
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
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};
