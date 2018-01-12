const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    entry: './src/P0weruser.js',
    output: {
        filename: 'p0weruser.user.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: fs.readFileSync(
                path.resolve(__dirname, 'src/template/scriptHeader.txt'), 'utf8'
            ),
            raw: true,
            entryOnly: true
        }),
        new WebpackAutoInject({
            NAME: 'p0weruser',
            SILENT: true,
            PACKAGE_JSON_PATH: './package.json',
            components: {
                AutoIncreaseVersion: true,
                InjectByTag: true
            },
            componentsOptions: {
                AutoIncreaseVersion: {
                    runInWatchMode: false
                },
                InjectByTag: {
                    fileRegex: /\.+/,
                    dateFormat: 'h:MM:ss TT'
                }
            }
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
                test: /\.(less|css)$/,
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
