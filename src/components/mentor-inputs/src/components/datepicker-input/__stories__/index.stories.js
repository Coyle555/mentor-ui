import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('Datetime Input', () =>
		<DatePickerInput
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			type="datetime"
			value={new Date('2019-09-05 17:04:41.2350000')}
		/>
	)
	.add('Date Input', () =>
		<DatePickerInput
			name="datepicker-input"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			type="date"
			value={new Date('2019-09-05')}
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
