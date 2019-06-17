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
				root: [path.join(__dirname, './packages')],
				alias: {
				  'utils': path.join(__dirname, './packages/utils'),
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

