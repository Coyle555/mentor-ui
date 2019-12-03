const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	mode: 'production',
	entry: './src/index.js',
	// optimization: {
	//   splitChunks: {
	//     // include all types of chunks
	//     chunks: 'all'
	//   }
	// },
	output: {
		filename: 'index.js',
		library: '',
		// filename: '[name].js',
		path: __dirname + '/dist',
		//umdNamedDefine: true,
		libraryTarget: 'commonjs',
	},
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

