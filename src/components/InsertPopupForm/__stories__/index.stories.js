import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from 'storybook-utils';
import { withInfo } from '@storybook/addon-info';

import InsertPopupForm from '../';

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
	

storiesOf('InsertPopupForm', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add('general', () => {
		
		const buttonText = text('children', 'Button Text');
		return (
			<InsertPopupForm 
				formFields={[
					{
						id: 'id',
						category: 'Id',
						required: true
					}
				]}
			/>
		)
})