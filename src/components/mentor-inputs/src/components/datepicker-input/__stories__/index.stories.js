import React from 'react';
import { storiesOf } from '@storybook/react';

import DatePickerInput from '../DatePickerInput';

storiesOf('Inputs/DatePickerInput', module)
	.add('general', () =>
		<DatePickerInput
			maxDate='2019-08-01'
			minDate='2019-06-01'
			minHour={15}
			maxHour={23}
			minMinute={10}
			maxMinute={40}
		/>
	)
