const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkerPlugin = require('worker-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		library: '',
		// filename: '[name].js',
		path: __dirname + '/dist',
		//umdNamedDefine: true,
		libraryTarget: 'commonjs',
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'mentor-ui',
					test: /\.(le|c)ss$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: ['babel-loader'],
				exclude: /node_modules/
			},					
			{
				test: /\.(le|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
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
		new CleanWebpackPlugin(),
		new WorkerPlugin(),
		new webpack.ProgressPlugin({ profile: false }),
		new CaseSensitivePathsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].style.css'
		}),
	],
	externals: {
		react: {
			commonjs: "react",
			commonjs2: "react",
			amd: "React",
			root: "React"
		},
		"react-dom": {
			commonjs: "react-dom",
			commonjs2: "react-dom",
			amd: "ReactDOM",
			root: "ReactDOM"
		}
	},
	resolve: {
		extensions: ['.js', '.jsx', '.less'],
		alias: {
			'react': path.join(__dirname, './node_modules/react'),
			'react-dom': path.join(__dirname, './node_modules/react-dom'),
			'mentor-ui-constants': path.resolve(__dirname, './src/styles/mentor-ui-constants.less')
		}
	} 
};

