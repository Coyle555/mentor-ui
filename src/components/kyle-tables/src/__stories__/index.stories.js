import React, { useState } from 'react';
import { storiesOf, action } from '@storybook/react';

import { Table } from '../index';

const columns = [
	{
		category: 'Number',
		id: 'num',
		type: 'integer',
	},
	{
		category: 'Description',
		id: 'desc',
		type: 'string',
	},
	{
		category: 'DateTime',
		id: 'datetime',
		type: 'datetime'
	},
	{
		category: 'Date',
		id: 'date',
		type: 'date'
	}
];

const data = [
	{ num: 3, desc: 'Test desc', datetime: new Date() },
	{ num: 31, desc: 'Another desc', date: new Date() },
	{ num: 938, desc: 'Foo bar' }
];

storiesOf('Table', module)
	.add('Basic table', () => (
		<Table
			columns={columns}
			currentPage={1}
			data={data}
			pageSize={25}
			recordCount={data.length}
		/>
	));
