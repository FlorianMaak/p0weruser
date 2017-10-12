const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

module.exports = {
    entry: './src/P0weruser.js',
    output: {
        filename: 'p0weruser.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: fs.readFileSync(
                path.resolve(__dirname, 'src/template/scriptHeader.txt'), 'utf8'
            ),
            raw: true,
            entryOnly: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    }
};
