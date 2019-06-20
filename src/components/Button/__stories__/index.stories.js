import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';

import Button from '../';

const optionsConfig = {
	medium: 'medium',
	isLight: 'isLight',
	isMini: 'isMini',
	isLeftEndCap: 'isLeftEndCap',
	isRightEndCap: 'isRightEndCap',
	disabled: 'disabled'
}

//options returns an array of strings
const formatProps = (selectedOptions = []) => 
	selectedOptions.reduce((obj, curr) => ({ ...obj, [curr]: true }), {});
	

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add('props', () => {

		const selectedOptions = options('Props', optionsConfig, [], { display: 'check'});
		const props = formatProps(selectedOptions);

		return (
			<div style={{padding: 10}}>
				<Button {...props}>
					Click Here
				</Button>
			</div>
		)
})
