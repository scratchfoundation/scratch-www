var path = require('path');
var webpack = require('webpack');

var environment = require('./src/environment.js');
var routes = require('./server/routes.json');

// Prepare all entry points
var entry = {
    init: './src/init.js',
    main: './src/main.jsx'
};
routes.forEach(function (route) {
    if ( ! route.static ) {
        entry[route.view] = './src/views/' + route.view + '/' + route.view + '.jsx';
    }
});

// Config
module.exports = {
    entry: entry,
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react/addons': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: '[name].bundle.js'
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
                loader: 'style!css!autoprefixer-loader?browsers=last 3 versions!sass'
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': environment
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
