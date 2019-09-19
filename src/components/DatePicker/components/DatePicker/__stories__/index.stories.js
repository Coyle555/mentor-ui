import React from 'react';
import { storiesOf } from '@storybook/react';
import Moment from 'moment';

import {
	DatePicker,
	TYPES,
} from '../';

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
	.add('Time option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.time}
		/>
	)
	.add('Time option with constraints', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.time}
			minHour={5}
			minMinute={24}
			maxMinute={55}
		/>
	)
	.add('Date option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.date}
		/>
	)
	.add('Date option with constraints', () =>
		<DatePicker
			moment={new Moment('2000-01-01')}
			onChange={() => {}}
			type={TYPES.date}
			maxDate={'2000-02-01'}
			minDate={'1999-12-31'}
		/>
	)
	.add('Date/Time option', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.datetime}
		/>
	)
	.add('Date/Time option with optional controls', () =>
		<DatePicker
			onChange={() => {}}
			type={TYPES.datetime}
			onCloseHandler={() => {}}
			onSaveHandler={() => {}}
			onClearHandler={() => {}}
		/>
	)
