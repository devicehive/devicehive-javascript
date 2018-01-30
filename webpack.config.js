const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    devtool: 'source-map',
    entry: `${__dirname}/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: `bundle.js`,
        libraryTarget: "commonjs2"
    },
    target: 'web',
    resolve: {
        modules: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
};