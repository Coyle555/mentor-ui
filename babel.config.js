const path = require('path');

const babelEnv = process.env.NODE_ENV !== 'test'
	? ["@babel/env", {"modules": false}]
	: '@babel/env'

module.exports = {
	plugins: [
		'@babel/plugin-proposal-class-properties',
		[
			'@babel/plugin-proposal-decorators',
			{ legacy: true },
		],
		[
			'module-resolver',
			{
				root: [path.join(__dirname, './src')],
				alias: {
					components: path.join(__dirname, './src/components'),
					utils: path.join(__dirname, './src/utils'),
					datepicker: path.join(__dirname, './src/components/DatePicker/index.js'),
					'mentor-inputs': path.join(__dirname, './src/components/mentor-inputs/src/index.js'),
					'structured-query': path.join(__dirname, './src/components/structured-query/src/index.js'),
					'insert-popup-form': path.join(__dirname, './src/components/InsertPopupForm/index.js'),
				}
			}
		],
		'@babel/transform-runtime'
	],
	presets: [
		babelEnv,
		'@babel/preset-react',
		'airbnb',
	],
}

