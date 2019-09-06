import React from 'react';
import { storiesOf } from '@storybook/react';

import { DatePickerComposed } from '../';

storiesOf('DatePicker/DatePickerComposed', module)
	.add('general', () =>
		<DatePickerComposed
			maxDate='2019-08-01'
			minDate='2019-06-01'
		/>
	)
