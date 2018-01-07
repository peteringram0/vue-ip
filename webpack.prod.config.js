const webpack = require('webpack');
const config = require('./webpack.base.config');
const path = require('path');

config.entry = './src/index.js';

config.output = {
    path: path.resolve('dist') + '/',
    filename: 'vue-ip.min.js',
    library: 'VueIp',
    libraryTarget: 'umd'
};

config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
            warnings: false,
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
        },
        output: {
            comments: false,
        },
        exclude: [/\.min\.js$/gi]
    })
];

module.exports = config;
