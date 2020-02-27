const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	// enable less
	config.module.rules.push({
		test: /\.less$/,
		use: ['style-loader', 'css-loader', 'less-loader'],
		include: path.resolve(__dirname, '../'),
	});

// config.module.rules.push(      {
//         test: /\.worker\.js$/,
//         use: { loader: 'worker-loader' }
//       })
	// resolvers
	config.resolve.alias['mentor-ui-constants'] = path.resolve(__dirname, '../src/styles/mentor-ui-constants.less');
	config.resolve.alias['storybook-utils'] = path.resolve(__dirname, '../src/utils/storybook');
	config.resolve.alias['storybook-useState'] = path.resolve(__dirname, './useState.addons');
	// Return the altered config
	return config;
};
