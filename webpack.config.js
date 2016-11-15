var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src');
var STYLE_DIR = path.resolve(__dirname, 'styles')
var TEMPLATE_DIR = path.resolve(__dirname, 'templates');

var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {
    entry: {
        js: APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.js/,
            include: APP_DIR,
            loader: 'babel'
        }, {
            test: /\.css/,
            include: STYLE_DIR,
            loaders: ["style", "css"]
        }, {
            test: /\.svg/,
            include: STYLE_DIR,
            loader: 'svg-url-loader'
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: TEMPLATE_DIR + '/index.html'
        })
    ]
};

module.exports = config;
