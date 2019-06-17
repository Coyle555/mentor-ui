const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const libs = fs.readdirSync('./packages/lib');

module.exports = libs.map(libName => {

	return {
		entry: `./packages/lib/${libName}/src/index.js`,
		output: {
			filename: 'index.js',
			path: `${__dirname}/packages/lib/${libName}/dist`,
		},
		node: { fs: 'empty' },

		optimization: {
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					main: {
						chunks: 'initial',
						name: 'vendor',
						priority: -10,
						test: /node_modules\/(.*)\.js/
					}
				}
			}
		},

		resolve: { extensions: ['.js', '.jsx'] },
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					loader: ['babel-loader'],
					exclude: /node_modules/
				},		
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				},
				{
					test: /\.less$/,
					use: ['style-loader', 'css-loader', 'less-loader']
				},
				{
					test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{ loader: 'url-loader?limit=100000' }]
				},
				{
					test: /\.(eot|com|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{ loader: 'url-loader?limit=10000&mimetype=application/octet-stream' }]
				},
				{
					test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
					use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }]
				}
			]
		},

		plugins: [
			new webpack.ProgressPlugin({ profile: false }),
			new CaseSensitivePathsPlugin(),
		]
	}


});