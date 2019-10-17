import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'components/Button';
import SegmentedList, { ListItem } from '../index';

const ExampleList = props => {
	const [list, setList] = useState([
		<div style={{ color: 'blue' }}>Foo</div>,
		<div style={{ color: 'green' }}>Bar</div>,
		<div style={{ color: 'red' }}>Baz</div>
	]);

	const AddItem = useCallback(() => {
		const [value, setValue] = useState('');

		return (
			<React.Fragment>
				<input
					onChange={evt => setValue(evt.target.value)}
					type="text"
				/>
				<Button
					onClick={() => setList(list.concat(<div>{value}</div>))}
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
			InsertItemComponent={<AddItem />}
			items={list}
			title="Segmented List Title"
		/>
	);
};

storiesOf('Segmented List', module)
	.add('general', () => {
		return <ExampleList />;
	});
