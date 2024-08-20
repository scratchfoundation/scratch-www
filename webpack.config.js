const defaults = require('lodash.defaults');
const gitsha = require('git-bundle-sha');
const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EmitFilePlugin = require('emit-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// PostCss
const autoprefixer = require('autoprefixer');

/** @type {Array} */
let routes = require('./src/routes.json');
const templateConfig = require('./src/template-config.js');

if (process.env.NODE_ENV !== 'production') {
    routes = routes.concat(require('./src/routes-dev.json')); // eslint-disable-line global-require
}

routes = routes.filter(route => !process.env.VIEW || process.env.VIEW === route.view);

const pageRoutes = routes.filter(route => !route.redirect);

/**
 * Retrieve a version ID string for the current build, to be emitted into `version.txt`.
 * @returns {Promise<string>} A promise that resolves to a version ID string.
 */
const getVersionId = () => {
    if (process.env.WWW_VERSION) {
        return Promise.resolve(process.env.WWW_VERSION);
    }
    return new Promise((resolve, reject) => {
        gitsha({length: 5}, (err, sha) => {
            if (err) {
                reject(err);
            } else {
                resolve(sha);
            }
        });
    });
};

// Prepare all entry points
const entry = {};

pageRoutes.forEach(route => {
    entry[route.name] = [
        './src/init.js',
        `./src/views/${route.view}.jsx`
    ];
});

// HtmlWebpackPlugin v4 removed 'chunks' info that we need for our custom template.
// This plugin is a quick-and-dirty partial implementation of that information.
// Adapted from https://github.com/jantimon/html-webpack-plugin/issues/1369#issuecomment-1049968234
// Thanks, @daniel-nagy!
class HtmlWebpackBackwardsCompatibilityPlugin {
    apply (compiler) {
        compiler
            .hooks
            .compilation
            .tap('HtmlWebpackBackwardsCompatibilityPlugin', compilation => {
                HtmlWebpackPlugin
                    .getHooks(compilation)
                    .beforeAssetTagGeneration
                    .tapAsync(
                        'HtmlWebpackBackwardsCompatibilityPlugin',
                        (data, callback) => {
                            const {publicPath} = data.assets;
                            const chunks = {};

                            for (const entryPoint of compilation.entrypoints.values()) {
                                for (const chunk of entryPoint.chunks) {
                                    const files = Array.from(chunk.files); // convert from Set
                                    chunks[chunk.name] = {
                                        entry: publicPath + files.find(file => file.endsWith('.js')),
                                        css: files
                                            .filter(file => file.endsWith('.css'))
                                            .map(file => publicPath + file)
                                    };
                                }
                            }

                            data.assets.chunks = chunks;

                            callback(null, data);
                        }
                    );
            });
    }
}

// Config
module.exports = {
    entry: entry,
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        fallback: {
            // Node modules are no longer polyfilled by default in Webpack 5, so we need to add these here
            Buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify') // jszip
        },
        symlinks: false // Fix local development with `npm link` packages
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)x?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                    /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                    /node_modules[\\/]pify/,
                    /node_modules[\\/]async/
                ],
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.hex$/,
                type: 'asset/resource',
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 16 * 1024
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    return [autoprefixer()];
                                }
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            },
                            importLoaders: 1,
                            esModule: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-import',
                                    'postcss-simple-vars',
                                    'autoprefixer'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
                loader: 'url-loader'
            }
        ],
        noParse: /node_modules\/google-libphonenumber\/dist/
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'all',
                    name: 'common',
                    minSize: 1024,
                    minChunks: pageRoutes.length // Extract only chunks common to all html pages
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: 4
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackBackwardsCompatibilityPlugin(),
        new EmitFilePlugin({
            filename: 'version.txt',
            content: getVersionId
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ].concat(pageRoutes
        .map(route => new HtmlWebpackPlugin(defaults({}, {
            title: route.title,
            filename: `${route.name}.html`,
            route: route,
            dynamicMetaTags: route.dynamicMetaTags
        }, templateConfig)))
    ).concat([
        new CopyWebpackPlugin({
            patterns: [
                {from: 'static'},
                {from: 'intl', to: 'js'},
                {
                    from: 'node_modules/scratch-gui/dist/static/blocks-media',
                    to: 'static/blocks-media'
                },
                {
                    from: 'node_modules/scratch-gui/dist/chunks',
                    to: 'static/chunks'
                },
                {
                    from: 'node_modules/scratch-gui/dist/extension-worker.js'
                },
                {
                    from: 'node_modules/scratch-gui/dist/extension-worker.js.map'
                },
                {
                    from: 'node_modules/scratch-gui/dist/static/assets',
                    to: 'static/assets'
                },
                {
                    from: 'node_modules/scratch-gui/dist/*.hex',
                    to: 'static',
                    flatten: true
                }
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
            'process.env.API_HOST': `"${process.env.API_HOST || 'https://api.scratch.mit.edu'}"`,
            'process.env.RECAPTCHA_SITE_KEY': `"${
                process.env.RECAPTCHA_SITE_KEY || '6Lf6kK4UAAAAABKTyvdSqgcSVASEnMrCquiAkjVW'}"`,
            'process.env.ASSET_HOST': `"${process.env.ASSET_HOST || 'https://assets.scratch.mit.edu'}"`,
            'process.env.BACKPACK_HOST': `"${process.env.BACKPACK_HOST || 'https://backpack.scratch.mit.edu'}"`,
            'process.env.CLOUDDATA_HOST': `"${process.env.CLOUDDATA_HOST || 'clouddata.scratch.mit.edu'}"`,
            'process.env.PROJECT_HOST': `"${process.env.PROJECT_HOST || 'https://projects.scratch.mit.edu'}"`,
            'process.env.STATIC_HOST': `"${process.env.STATIC_HOST || 'https://uploads.scratch.mit.edu'}"`,
            'process.env.SCRATCH_ENV': `"${process.env.SCRATCH_ENV || 'development'}"`,
            'process.env.THUMBNAIL_URI': `"${process.env.THUMBNAIL_URI || '/internalapi/project/thumbnail/{}/set/'}"`,
            'process.env.THUMBNAIL_HOST': `"${process.env.THUMBNAIL_HOST || ''}"`,
            'process.env.DEBUG': Boolean(process.env.DEBUG),
            'process.env.GA_ID': `"${process.env.GA_ID || 'UA-000000-01'}"`,
            'process.env.GTM_ENV_AUTH': `"${process.env.GTM_ENV_AUTH || ''}"`,
            'process.env.GTM_ID': process.env.GTM_ID ? `"${process.env.GTM_ID}"` : null,
            'process.env.USER_GUIDING_ID': `"${process.env.USER_GUIDING_ID || ''}"`,
            'process.env.SORTING_HAT_HOST': `"${process.env.SORTING_HAT_HOST || 'http://127.0.0.1:7676'}"`
        })
    ])
        .concat(process.env.ANALYZE_BUNDLE === 'true' ? [
            new BundleAnalyzerPlugin()
        ] : [])
};
