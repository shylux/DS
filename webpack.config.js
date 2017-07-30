var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/js/gamemaster.js',
    output: {
        path: path.resolve(__dirname, 'public/compiled'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'inline-source-map'
};
