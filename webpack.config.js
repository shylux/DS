var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./public/js/gamemaster.js', './public/css/main.scss'],
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
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                query: {
                    helperDirs: [
                        __dirname + "/public/js/helpers",
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            Handlebars: "handlebars"
        }),
        new ExtractTextPlugin({
            filename: 'app.bundle.css',
            allChunks: true
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'inline-source-map'
};
