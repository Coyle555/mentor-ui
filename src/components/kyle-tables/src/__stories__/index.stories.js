import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import { Table } from '../index';
const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCNDY3QjdFRDY3MjA2ODExODcxRkE4RjQyQzM2RTYwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNTRGMEY1NTk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNTRGMEY1NDk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQTFBNjQ2QjQyMDY4MTE4NzFGQThGNDJDMzZFNjBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0NjdCN0VENjcyMDY4MTE4NzFGQThGNDJDMzZFNjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3q/RKwAAAPpJREFUeNpi/P//PwMtAeOoBSRbYBM10wZIbQRiIRLNegHEoUB85MiydLggExaFE8gwHAQkgHgOuiA2C1Sg9F8sGFd4wsTVgZiTkAW4AEgtIxA/BeJoINYDYhMgvgMVhwE2ZE0sZAQFKJyPI/G/E3IVUYkBij8iGX4YGjS6eIKOKAsYkdR9RBLXJTZciQUdQOyDxHfAEQcMpMYBTPMjIL6MJH4BW6SS4wNY+E5DC+v/UCxHaRyANP8jIP+fkiBiwGcAActJimSyADYL/lJgHkjvL0IWHIHSzGgYF0CWP46es7HFQTrUFfZALEpkfLyDOix3tMocfBYABBgAAAJOxWsvzNoAAAAASUVORK5CYII=';

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
	},
	{
		category: 'Image',
		id: 'img',
		image: true
	},
	{
		category: 'Options',
		id: 'options',
		options: ['Option1', 'Option2', 'Option3']
	},
	{
		category: 'Link to File',
		id: 'file',
		file: true
	},
	{
		category: 'Color',
		id: 'color',
		color: true
	}
];

const data = [
	{
		datetime: new Date(),
		float: 13.5,
		id: 'row1',
		num: 3,
		string: 'Test desc',
		options: 'Option2',
		file: IMAGE,
		color: '#fff'
	},
	{
		date: new Date(),
		float: 5,
		id: 'row2',
		num: 31,
		object: { id: 'apple', name: 'Apple' },
		string: 'Another desc that is going to be really long. The quick brown fox jumped over the lazy dog.',
		color: '#ccc'
	},
	{
		date: null,
		float: .5,
		id: 'row3',
		object: { id: 'test', name: 'Test' },
		num: 938,
		string: 'Foo bar',
		options: 'Option3'
	},
	{
		date: null,
		float: .5,
		id: 'row4',
		string: 'bar',
		img: IMAGE
	},
	{
		date: null,
		float: .5,
		id: 'row5',
		object: { id: 'abc', name: 'ABC' },
		num: 12,
	},
];

const quickViews = [
	{ name: 'Quickview 1', columns: ['date', 'object'] },
	{ name: 'Quickview 2', columns: ['id', 'string', 'datetime'] },
	{ name: 'Quickview 3', columns: ['float', 'num'] },
];

const customToolbarButtons = [{
	icon: <i className="fal fa-acorn" />,
	onClick: action('customToolbarButtonClick'),
	tip: 'Custom Button',
}];

storiesOf('Table', module)
	.add('Basic table', () => (
		<Table
			columns={columns}
			csvURL="www.duckduckgo.com"
			currentPage={1}
			customToolbarButtons={customToolbarButtons}
			data={data}
			deleteCb={action('onDeleteClick')}
			handleTableChange={action('handleTableChange')}
			onDisplayColChange={action('onDisplayColChange')}
			pageSize={5}
			quickViews={quickViews}
			recordCount={10}
			sortId="string"
			sortDir="ASC"
			updateCb={action('updateCb')}
			uploadFileCb={action('uploadFileCb')}
		/>
	))
	.add('Loading table', () => (
		<Table loading={true} />
	));
