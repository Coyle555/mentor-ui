import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import { Time } from '../';

const m = moment();

storiesOf('Time', module)
	.add('general', () =>
		<Time
			moment={m}
			onChange={() => console.log('changed')}
			display
		/>
	)
