var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');


var APP_DIR = path.resolve(__dirname, 'src');
var STYLE_DIR = path.resolve(__dirname, 'styles')
var TEMPLATE_DIR = path.resolve(__dirname, 'templates');

var BUILD_DIR = path.resolve(__dirname, 'build');

var config = {
    entry: {
        js: APP_DIR + '/index.js',
        css: STYLE_DIR + '/index.css'
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
            loader: ExtractTextPlugin.extract('css')
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: TEMPLATE_DIR + '/index.html'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};

module.exports = config;
