var webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        vendor: ['jquery']
    },
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // filename: 'static/js/[name].js',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
    ],

}