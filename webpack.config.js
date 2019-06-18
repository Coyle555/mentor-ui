const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

<<<<<<< HEAD
module.exports = {
	mode: 'production',
	entry: {
		'mentor-inputs': './src/lib/mentor-inputs/src/index.js',
		'structured-query': './src/lib/structured-query/src/index.js',
		'insert-popup-form': './src/lib/insert-popup-form/src/index.js',
		'kyle-tables': './src/lib/kyle-tables/src/index.js',
		'helper-components': './src/lib/helper-components/src/index.js',
		'datepicker': './src/lib/datepicker/src/index.js',
	},
	  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
	output: {
		filename: '[name].js',
		path: __dirname + '/dist',
		libraryTarget: 'commonjs2',
	},
	resolve: { extensions: ['.js', '.jsx'] },
	// optimization: {
	// 	runtimeChunk: false,
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			main: {
	// 				chunks: 'initial',
	// 				name: 'vendor',
	// 				priority: -10,
	// 				test: /node_modules\/(.*)\.js/
	// 			}
	// 		}
	// 	}
	// },	
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
  	new TerserPlugin({
    	parallel: true,
    	terserOptions: { ecma: 6 }
    }),
		new webpack.ProgressPlugin({ profile: false }),
		new CaseSensitivePathsPlugin(),
	],
	externals: [
		'react'
	]
};
=======
const libs = [
	'mentor-inputs',
	'structured-query',
	'helper-components',
	'datepicker',
	'insert-popup-form',
	'kyle-tables'
];

module.exports = libs.map(libName => {

	return {
		mode: 'production',
		entry: `./packages/lib/${libName}/src/index.js`,
		output: {
			filename: 'index.js',
			path: `${__dirname}/packages/lib/${libName}/dist`,
			libraryTarget: 'commonjs2',
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
			new TerserPlugin({
				parallel: true,
				terserOptions: { ecma: 6 }
			}),
				new webpack.ProgressPlugin({ profile: false }),
				new CaseSensitivePathsPlugin(),
			],
		externals: [
			'react'
		]
	}
});
>>>>>>> 6b2899fd837423fc7608a6ee6fdcba4f61c9860e
