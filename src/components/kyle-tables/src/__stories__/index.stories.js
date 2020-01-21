import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import { Table, TableComponent } from '../../../../index';
import { DraggableTable } from './DraggableTable';
const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCNDY3QjdFRDY3MjA2ODExODcxRkE4RjQyQzM2RTYwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNTRGMEY1NTk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNTRGMEY1NDk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQTFBNjQ2QjQyMDY4MTE4NzFGQThGNDJDMzZFNjBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0NjdCN0VENjcyMDY4MTE4NzFGQThGNDJDMzZFNjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3q/RKwAAAPpJREFUeNpi/P//PwMtAeOoBSRbYBM10wZIbQRiIRLNegHEoUB85MiydLggExaFE8gwHAQkgHgOuiA2C1Sg9F8sGFd4wsTVgZiTkAW4AEgtIxA/BeJoINYDYhMgvgMVhwE2ZE0sZAQFKJyPI/G/E3IVUYkBij8iGX4YGjS6eIKOKAsYkdR9RBLXJTZciQUdQOyDxHfAEQcMpMYBTPMjIL6MJH4BW6SS4wNY+E5DC+v/UCxHaRyANP8jIP+fkiBiwGcAActJimSyADYL/lJgHkjvL0IWHIHSzGgYF0CWP46es7HFQTrUFfZALEpkfLyDOix3tMocfBYABBgAAAJOxWsvzNoAAAAASUVORK5CYII=';

const columns = [
	{
		label: 'Id',
		id: 'id',
		type: 'string',
		updateable: false,
		display: false
	},
	{
		label: 'Number',
		id: 'num',
		type: 'integer',
		display: false
	},
	{
		label: 'Float',
		id: 'float',
		type: 'float',
		display: false
	},
	[{
		label: 'String',
		id: 'string',
		type: 'string',
		//required: true
	},
	{
		label: 'Multiline',
		id: 'multiline',
		type: 'multiline',
		display: false,
	}],
	{
		label: 'Email',
		id: 'email',
		type: 'email',
		display: false,
		onLink: () => {}
	},
	{
		label: 'Money',
		id: 'money',
		type: 'money',
		display: false
	},
	{
		label: 'URL',
		id: 'url',
		type: 'url',
		display: false
	},
	{
		label: 'DateTime',
		id: 'datetime',
		type: 'datetime',
		utc: true
	},
	{
		label: 'Date',
		id: 'date',
		type: 'date',
		utc: false
	},
	{
		label: 'Object',
		id: 'object',
		parse: val => typeof val === 'object' ? val.name : '',
		display: false
	},
	{
		label: 'Image',
		id: 'img',
		type: 'image',
		display: false
	},
	{
		label: 'List Filter w/ array',
		id: 'listfilterarray',
		type: 'listfilter',
		options: ['Option1', 'Option2', 'Option3']
	},
	[{
		label: 'List Filter w/ func',
		id: 'listfilterfunc',
		type: 'listfilter',
		options: val => ([
			{ id: 'foo', name: 'Foo' },
			{ id: 'bar', name: 'Bar' },
			{ id: 'baz', name: 'Baz' }
		]),
		parse: val => !!val && typeof val ==='object' ? val.name : val,
		required: true
		//parseMatchedValue: val => val.id
	},
	{
		label: 'Options',
		id: 'options',
		options: ['Option1', 'Option2', 'Option3']
	}],
	{
		label: 'Link to File',
		id: 'file',
		type: 'file'
	},
	{
		label: 'Color',
		id: 'color',
		type: 'color'
	},
	{
		label: 'Custom Column',
		id: 'customColumnId'
	}
];

const data = [
	{
		datetime: '2019-09-05 17:04:41.2350000',
		float: 13.5,
		id: 'row1',
		listfilterfunc: { id: 'bar', name: 'Bar' },
		num: 3,
		string: 'Test desc',
		multiline: 'multi test',
		options: 'Option2',
		file: IMAGE,
		img: IMAGE,
		color: '#000000',
		customColumnId: 'custom 1'
	},
	{
		date: '2019-09-05',
		float: 5,
		id: 'row2',
		num: 31,
		object: { id: 'apple', name: 'Apple' },
		string: 'Another desc that is going to be really long. The quick brown fox jumped over the lazy dog.',
		color: '#B80000',
		customColumnId: 'custom 2'
	},
	{
		date: null,
		float: .5,
		id: 'row3',
		object: { id: 'test', name: 'Test' },
		num: 938,
		string: 'Foo bar',
		color: '#FCCB00',
		options: 'Option3',
		customColumnId: 'custom 3'
	},
	{
		date: null,
		float: .5,
		id: 'row4',
		string: 'bar',
		color: '#008B02',
		img: IMAGE
	},
	{
		date: null,
		float: .5,
		id: 'row5',
		object: { id: 'abc', name: 'ABC' },
		color: '#DB3E00',
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

const filters = [{ label: 'Color', id: 'color', operator: 'equals', value: 'white' }];

const Section3 = ({ row = {} }) => {
	return <h2>{Object.keys(row).toString()}</h2>;
};

const editSections = [
	{ label: 'Edit section 1', content: <h2>Edit Section 1</h2> },
	{
		label: 'Edit section 2',
		content: (row) => <span>{JSON.stringify(row)}</span>
	},
	{ label: 'Edit section 3', content: <Section3 /> }
];

const customColumns = { customColumnId: (row, { editMode, rowSelected, value }) =>
	editMode && rowSelected
		? null
		: <span>Custom Column -- {value}</span>
};

storiesOf('Table', module)
	.add('Basic table', () => (
		<Table
			columns={columns}
			csvURL="www.duckduckgo.com"
			currentPage={1}
			customColumns={customColumns}
			customToolbarButtons={customToolbarButtons}
			data={data}
			deleteCb={action('onDeleteClick')}
			editSections={editSections}
			exportTable={action('exportTable')}
			filters={filters}
			handleTableChange={action('handleTableChange')}
			insertCb={action('insertCb')}
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
	.add('Expandable table', () => {
		const ExpandComponent = (props) => <span>{JSON.stringify(props)}</span>;

		return (
			<Table
				columns={[
					{
						label: 'Id',
						id: 'id',
						type: 'string',
						display: false
					},
					{
						label: 'String Col',
						id: 'expand',
						type: 'string',
					}
				]}
				data={[{ id: '1', expand: 'test' }]}
				ExpandComponent={<ExpandComponent />}
				pageSize={5}
				recordCount={1}
			/>
		);
	})
	.add('Row buttons', () => (
		<Table
			columns={[
				{
					label: 'Id',
					id: 'id',
					type: 'string',
					display: false
				},
				{
					label: 'String Col',
					id: 'col',
					type: 'string',
				}
			]}
			data={[{ id: '1', col: 'test' }]}
			pageSize={5}
			recordCount={1}
			rowButtons={[{
				icon: <i className="fal fa-abacus" />,
				onClick: action('extraColumnClick')
			}]}
		/>
	))
	.add('Loading table', () => (
		<Table loading={true} />
	))
	.add('Draggable table', () => (
		<DraggableTable
			columns={columns}
			data={data}
		/>
	))
	.add('Table Component', () => (
		<TableComponent
			columns={columns}
			id="TableComponent"
			rowProperties={{
				data
			}}
			pageProperties={{
				currentPage: 1,
				enabled: true,
				entriesViewable: 5,
				pageSize: 5,
				recordCount: 10
			}}
		/>
	));
