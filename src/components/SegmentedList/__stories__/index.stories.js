import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'components/Button';
import SegmentedList from '../index';

const ExampleList = props => {
	const [list, setList] = useState([
		<div style={{ color: 'blue' }}>Foo</div>,
		<div style={{ color: 'green' }}>Bar</div>,
		<div style={{ color: 'red' }}>Baz</div>
	]);

	const AddItem = useCallback((props) => {
		const [value, setValue] = useState('');

		return (
			<React.Fragment>
				<input
					onChange={evt => setValue(evt.target.value)}
					type="text"
				/>
				<Button
					onClick={() => props.addItem(value)}
					type="button"
				>
					Add
				</Button>
			</React.Fragment>
		);
	});

	return (
		<SegmentedList
			insertable={true}
			InsertItemComponent={AddItem}
			insertOrientation="before"
			items={list}
			title="Segmented List Title"
		/>
	);
};

storiesOf('Segmented List', module)
	.add('general', () => {
		return <ExampleList />;
	});
