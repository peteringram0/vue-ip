const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

config.entry = './src/index.js';

config.output = {
    path: path.resolve('dist') + '/',
    filename: 'vue-ip.min.js',
    library: 'VueIp',
    libraryTarget: 'umd'
};

config.plugins = [

    new UglifyJSPlugin()

];

module.exports = config;
