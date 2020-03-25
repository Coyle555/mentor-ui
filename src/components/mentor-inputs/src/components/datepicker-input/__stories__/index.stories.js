import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('Datetime Input', () => {
		const [value, setValue] = React.useState('2019-09-05 17:04:41.2350000');

		return (
			<DatePickerInput
				isUtc={true}
				name="datepicker-input"
				onBlur={(err, value) => {
					setValue(value);
				}}
				onChange={action('onChange')}
				type="datetime"
				value={value}
			/>
		);
	})
	.add('Date Input', () => {
		const [value, setValue] = React.useState('2019-09-05');

		return (
			<DatePickerInput
				name="datepicker-input"
				onBlur={(err, value) => {
					setValue(value);
				}}
				onChange={action('onChange')}
				type="date"
				isUtc={false}
				value={value}
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
