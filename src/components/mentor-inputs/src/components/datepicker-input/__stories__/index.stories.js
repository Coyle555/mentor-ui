import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('general', () =>
		<DatePickerInput
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
		/>
	)
