import React, { useState } from 'react';
import { storiesOf, action } from '@storybook/react';

import { StructuredQuery } from '../index';

const onTokenAdd = () => {};
const onTokenRemove = () => {};
const exportSearch = () => {};

storiesOf('Structured Query', module)
	.add('String options', () => {
		const options = [
			{ id: 'foo', category: 'Foo', type: 'string' },
			{ id: 'bar', category: 'Bar', type: 'string' },
			{ id: 'baz', category: 'Baz', type: 'string' }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				options={options}
			/>
		);
	})
	.add('Enumerated options', () => {
		const options = [
			{ id: 'foo', category: 'Foo', options: ['Test', 'Apple', 'Orange'] }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				options={options}
			/>
		);
	})
	.add('Datepicker', () => {
		const options = [
			{ id: 'foo', category: 'DateTime', type: 'datetime' },
			{ id: 'bar', category: 'Date', type: 'date' }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				options={options}
			/>
		);
	});
