import React, { useState } from 'react';
import { storiesOf, action } from '@storybook/react';

import { StructuredQuery } from '../index';

const onTokenAdd = () => {};
const onTokenRemove = () => {};
const exportSearch = () => {};

storiesOf('Structured Query', module)
	.add('String fields', () => {
		const fields = [
			{ id: 'foo', label: 'Foo', type: 'string' },
			{ id: 'bar', label: 'Bar', type: 'string' },
			{ id: 'baz', label: 'Baz', type: 'string' }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				fields={fields}
			/>
		);
	})
	.add('Enumerated fields', () => {
		const fields = [
			{ id: 'foo', label: 'Foo', options: ['Test', 'Apple', 'Orange'] }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				fields={fields}
			/>
		);
	})
	.add('Datepicker', () => {
		const fields = [
			{ id: 'foo', label: 'DateTime', type: 'datetime' },
			{ id: 'bar', label: 'Date', type: 'date' }
		];

		return (
			<StructuredQuery
				exportSearch={exportSearch}
				onTokenAdd={onTokenAdd}
				onTokenRemove={onTokenRemove}
				fields={fields}
			/>
		);
	});
