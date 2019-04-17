/**
 * Created by rouven on 11.04.17.
 */

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'wikomData',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    "**/__tests__/*"
                ],
                use: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    externals: {
        "file-saver": "file-saver",
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
