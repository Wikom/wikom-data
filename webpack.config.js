/**
 * Created by rouven on 11.04.17.
 */

const path = require('path');

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
    debug: true,
    devtool: 'source-map',
    externals: {
        "find-in-object": "find-in-object",
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
