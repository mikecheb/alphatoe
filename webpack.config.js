var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {
    entry: [APP_DIR + '/index.js'],
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.js/,
            include: APP_DIR,
            loader: 'babel'
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};

module.exports = config;
