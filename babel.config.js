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
				  'utils': path.join(__dirname, './src/utils'),
				  'datepicker': path.join(__dirname, './src/lib/datepicker/src/index.js'),
				  'mentor-inputs': path.join(__dirname, './src/lib/mentor-inputs/src/index.js'),
				  'structured-query': path.join(__dirname, './src/lib/structured-query/src/index.js'),
				  'helper-components': path.join(__dirname, './src/lib/helper-components/src/index.js'),
				  'insert-popup-form': path.join(__dirname, './src/lib/insert-popup-form/src/index.js'),
				}
			}
		],
	],
	presets: [
		babelEnv,
		'@babel/preset-react',
		'airbnb',
	],
}

