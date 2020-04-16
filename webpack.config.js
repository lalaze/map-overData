
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apiMocker = require('mocker-api');
const path = require("path");
module.exports = {
    entry : "./src/entry.js",//入口文件
    output : {//输出文件
        filename : 'mapData.js',//输出文件名
        // path : __dirname + '/dist'//输出文件路径
        path:path.resolve(__dirname,"dist"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/ //排除 node_modules 目录
            }
        ]
    },
    mode: "development",
    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './test/index.html',
            filename: 'index.html', //打包后的文件名
            inject:'head',
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        })
    ],
    devServer: {
        // publicPath: path.resolve(__dirname,"dist"),
        open: true,
        // openPage: '/dist/index',
        before (app) {
          apiMocker(app, path.resolve('./mock/mocker.js'))
        }
    },
}