const config = require('./webpack.base.config');
const path = require('path');

config.entry = './index.js';
config.mode = 'development';

config.output = {
    path: path.resolve('build') + '/',
    publicPath: 'build',
    filename: 'build.js',
};

module.exports = config;
