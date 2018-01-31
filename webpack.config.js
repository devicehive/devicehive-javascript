const webpack = require('webpack');


module.exports = {
    entry: `${__dirname}/index-browser.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: `bundle.js`,
        libraryTarget: "umd"
    },
    target: 'web',
    resolve: {
        modules: ["node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.js/, exclude: /(node_modules|bower_components)/, loader: "babel-loader", options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
};