const webpack = require('webpack');


module.exports = {
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
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
};