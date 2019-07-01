import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';
import { withInfo } from '@storybook/addon-info';

import Button from '../';

const optionsConfig = {
	block: 'block',
	disabled: 'disabled',
	isCapless: 'isCapless',	
	isLight: 'isLight',
	isLeftEndCap: 'isLeftEndCap',	
	isMini: 'isMini',
	isRightEndCap: 'isRightEndCap',
	medium: 'medium',
}

//options returns an array of strings
const formatProps = (selectedOptions = []) => 
	selectedOptions.reduce((obj, curr) => ({ ...obj, [curr]: true }), {});
	

storiesOf('Button', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add('general', () => {
		
		const buttonText = text('children', 'Button Text');
		return (
			<Button 
				block={boolean('block', false)}
				disabled={boolean('disabled', false)}
				isCapless={boolean('isCapless', false)}
				isLight={boolean('isLight', false)}
				isLeftEndCap={boolean('isLeftEndCap', false)}
				isMini={boolean('isMini', false)}
				isRightEndCap={boolean('isRightEndCap', false)}
				isOutline={boolean('isOutline', false)}
				medium={boolean('medium', false)}
				onClick={action('onClick')}
			>
				{ buttonText }
			</Button>
		)
})
