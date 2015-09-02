var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.jsx',
        splash: './src/views/splash/splash.jsx'
    },
    devtool: 'source-map',
    externals: {
        'react': 'React',
        'react/addons': 'React'
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
                loader: 'json-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};
