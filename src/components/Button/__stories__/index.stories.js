import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';

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
	.addDecorator(withKnobs)
	.addWithJSX('props', () => {

		const selectedOptions = options('Props', optionsConfig, [], { display: 'check'});
		const props = formatProps(selectedOptions);

		return (
			<div>
				<Button {...props}
					onClick={action('onClick')}
				>
					Button Component!
				</Button>
			</div>
		)
})
