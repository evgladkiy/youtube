const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        bundle: __dirname + '/src/app.js',
        render: __dirname + '/src/render.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    watch: true,
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
};
