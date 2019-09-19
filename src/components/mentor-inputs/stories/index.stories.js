import { configure } from '@storybook/react';

//const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
	require('../src/components/boolean-input/__stories__/booleanInput.stories.js');
	//req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
