'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './extension/dist'),
        filename: '[name].js',
    },
    plugins:[
        new ExtractTextPlugin('[name].css', {allChunks: true}),
         new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index'],
            hash: true
        })
    ],
    module:{
        loaders:[
            {
                test: /\.js$/, loader: 'babel-loader',
                exclude: /(node_modules|libs)/
            },
            {
                test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                 })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    name: '[path][name].[ext]?[hash:8]',
                    limit: 8192 
                }
            }
        ]
    }
}