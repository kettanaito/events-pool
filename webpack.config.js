const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const SRC_PATH = path.resolve(__dirname, packageJson.source);

module.exports = {
    entry: SRC_PATH,
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
                include: SRC_PATH,
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
                warnings: false
            }
        })
    ]
};
