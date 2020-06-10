import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

import FileInput from '../fileInput';


const actions = {
	onDrop: action('onDrop')
}

storiesOf('Inputs/FileInput', module)
	.addDecorator(withKnobs)
	.addWithJSX('basic', () => {

		return (
			<FileInput onDrop={actions.onDrop} />
		)
	})



