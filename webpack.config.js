var path = require('path');
var webpack = require('webpack');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        app: [path.join(__dirname, "src", "index.js")]
    }, 
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].[hash].js"
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            { 
                test: /\.js(x)?$/, 
                exclude: /node_modules|dev_bot/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
            },
            {
                test:/\.(s*)css$/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                  limit: 10000,
                  name: path.posix.join('assets/[name].[ext]')
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: { 
            '@': resolve('src'),
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    optimization: {
        // minimizer: [
        //     new UglifyJSPlugin({
        //         sourceMap: false,
        //         uglifyOptions: {
        //             compress: {
        //                 inline: false
        //             }
        //         }
        //     })
        // ],
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor_app',                    
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        new HtmlWebPackPlugin({
            // hash: true,
            template: 'src/public/index.html',
            filename: 'index.html', //relative to root of the application
            inlineSource: '[runtime|vendors]~.+\\.js'
        }),
        //new HtmlWebpackInlineSourcePlugin(),
        // new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        historyApiFallback: true
    }
}