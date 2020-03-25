import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('Datetime Input', () =>
		<>
		<input type="text" />
		<DatePickerInput
			isUtc={true}
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			type="datetime"
			value={'2019-09-05 17:04:41.2350000'}
		/>
		<input type="text" />
		</>
	)
	.add('Date Input', () =>
		<DatePickerInput
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			type="date"
			isUtc={false}
			value={'2019-09-05'}
		/>
	)
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
