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
				  // 'insert-popup-form': './src/lib/insert-popup-form',
				  // 'helper-components': './src/lib/helper-components',
				  // 'mentor-inputs': './src/lib/mentor-inputs/',
				  // 'structured-query': './src/lib/structured-query',
				  // 'kyle-tables': './src/lib/kyle-tables'
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

