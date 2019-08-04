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
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
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
                                    "chrome": 60
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