var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var routes = require('./server/routes.json');
var BuildLocalePlugin = require('./intl/build-locale-webpack-plugin');

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
        new BuildLocalePlugin({
            languages: require('./intl/languages.json'),
            localizedUrls: require('./intl/localized-urls.json')
        }),
        new CopyWebpackPlugin([
            {from: 'static'}
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};
