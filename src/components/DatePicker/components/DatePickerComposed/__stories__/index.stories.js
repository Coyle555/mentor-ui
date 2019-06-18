import React from 'react';
import { storiesOf } from '@storybook/react';

import { DatePickerComposed } from '../';

storiesOf('DatePickerComposed', module)
	.add('general', () =>
		<DatePickerComposed
		/>
	)
