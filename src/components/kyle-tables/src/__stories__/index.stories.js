import React, { useState } from 'react';
import { storiesOf, action } from '@storybook/react';

import { Table } from '../index';

const columns = [
	{
		category: 'Id',
		id: 'id',
		type: 'string',
		display: false
	},
	{
		category: 'Number',
		id: 'num',
		type: 'integer',
	},
	{
		category: 'Float',
		id: 'float',
		type: 'float'
	},
	{
		category: 'String',
		id: 'string',
		type: 'string',
	},
	{
		category: 'DateTime',
		id: 'datetime',
		type: 'datetime',
		display: false
	},
	{
		category: 'Date',
		id: 'date',
		type: 'date'
	},
	{
		category: 'Object',
		id: 'object',
		display: false
	}
];

const data = [
	{
		datetime: new Date(),
		float: 13.5,
		id: 'row1',
		num: 3,
		string: 'Test desc',
	},
	{
		date: new Date(),
		float: 5,
		id: 'row2',
		num: 31,
		object: { id: 'apple', name: 'Apple' },
		string: 'Another desc that is going to be really long. The quick brown fox jumped over the lazy dog.',
	},
	{
		date: null,
		float: .5,
		id: 'row3',
		object: { id: 'test', name: 'Test' },
		num: 938,
		string: 'Foo bar',
	}
];

const quickViews = [
	{ name: 'Quickview 1', columns: ['date', 'object'] },
	{ name: 'Quickview 2', columns: ['id', 'string', 'datetime'] },
	{ name: 'Quickview 3', columns: ['float', 'num'] },
];
	

storiesOf('Table', module)
	.add('Basic table', () => (
		<Table
			columns={columns}
			currentPage={1}
			data={data}
			pageSize={25}
			quickViews={quickViews}
			recordCount={data.length}
		/>
	));
