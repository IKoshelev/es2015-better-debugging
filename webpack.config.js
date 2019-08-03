var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        index: './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    optimization: {
        // More on the configuration on splitting:
        // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693#configurate-cache-groups
        // https://wanago.io/2018/06/04/code-splitting-with-splitchunksplugin-in-webpack-4/
        splitChunks: {
            cacheGroups: {
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                /*change the name prop name to change bundle name*/
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    priority: -10
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": {
                                    //"chrome": 1,
                                    "chrome": 72
                                }
                            }],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {
                                "legacy": true
                            }],
                            ["@babel/plugin-proposal-class-properties", {
                                "loose": true
                            }]
                        ]
                    }
                }
            }
        ]
    }
};