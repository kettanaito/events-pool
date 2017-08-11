const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
    entry: path.resolve(__dirname, packageJson.source),
    output: {
        path: __dirname,
        filename: packageJson.main,
        library: packageJson.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            comments: false,
            compress: {
                drop_console: true,
                screw_ie8: true,
                warnings: false
            }
        })
    ]
};
