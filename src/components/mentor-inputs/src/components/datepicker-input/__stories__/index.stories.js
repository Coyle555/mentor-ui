import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('Datetime Input', () => {
		return (
			<DatePickerInput
				isUtc={true}
				name="datepicker-input"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				type="datetime"
			/>
		);
	})
	.add('Date Input', () => {
		return (
			<DatePickerInput
				name="datepicker-input"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				type="date"
				isUtc={false}
			/>
		);
	})
	.add('Required Date Input', () =>
		<DatePickerInput
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			required={true}
			type="date"
		/>
	)
	.add('Disabled Date Input', () =>
		<DatePickerInput
			disabled={true}
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			type="date"
		/>
	)
