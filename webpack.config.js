const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const wbloaders = [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: [
                [
                    "@babel/preset-env",
                    { "useBuiltIns": "entry" }
                ]
            ]
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
        use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader',
            'sass-loader'
        ]
    }
];

module.exports = [{
    mode: 'development',
    entry: ['@babel/polyfill', './public/js/client.js', './public/css/main.scss'],
    output: {
        path: path.resolve(__dirname, 'public/compiled'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: wbloaders
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            Handlebars: "handlebars",
            io: "socket.io-client"
        }),
        new MiniCssExtractPlugin({
            filename: 'app.bundle.css'
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'inline-source-map'
},

{
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: ['babel-polyfill', './server.js'],
    output: {
        filename: 'app.js'
    },
    module: {
        rules: wbloaders
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty',
        net: 'empty'
    }
}];


