/**
 * Created by RedMoon on 2017/2/14.
 */

const webpack = require('webpack');
const path = require('path');

let workPath = path.join(__dirname, './public/src/webpack');

module.exports = {
    entry: `${workPath}/entry.js`,
    output: {
        path: workPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel',
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};