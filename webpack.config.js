var webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: "./main.js",
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json') // eslint-disable-line
        }),
    ],
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }]
    }
}