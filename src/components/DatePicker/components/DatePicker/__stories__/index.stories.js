
import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import {
	DatePicker,
	TYPES,
} from '../';

const m = moment();

storiesOf('DatePicker', module)
	.addDecorator(storyFn => (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			paddingTop: '36px',
		}}>
			{storyFn()}
		</div>
	))
	.add('Date/Time option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.datetime}
		/>
	)
	.add('Time option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.time}
		/>
	)
	.add('Date option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.date}
		/>
	)
