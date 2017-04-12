/**
 * Created by rouven on 11.04.17.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'wikomData',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true
            },
            output: {
                comments: false
            }
        })
    ],
    externals: {
        "find-in-object": "find-in-object.git",
        "prop-types": "prop-types",
        "react": "react",
        "react-dom": "react-dom",
        "react-loading": "react-loading",
        "react-redux": "react-redux",
        "react-router-redux": "react-router-redux",
        "react-symbol": "react-symbol",
        "redux": "redux",
        "superagent": "superagent"
    }
};
