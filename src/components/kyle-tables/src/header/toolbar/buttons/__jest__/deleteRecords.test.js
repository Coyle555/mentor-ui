import React from 'react';
import { DeleteWarning, DeleteRecords } from '../deleteRecords';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

// Delete Warning
test('Delete warning renders default correctly', () => {
	const tree = renderer.create(<DeleteWarning />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Delete warning renders with multiple rows selected correctly', () => {
	function onDeleteClick() {}

	const tree = renderer.create(
		<DeleteWarning
			numRowsSelected={5}
			onDeleteClick={onDeleteClick}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});


// Delete Button
test('Delete button renders default correctly', () => {
	const tree = renderer.create(<DeleteRecords />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Delete button renders enabled when number of rows selected > 0', () => {
	const tree = renderer.create(<DeleteRecords numRowsSelected={2} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Delete button delete warning turns on when clicked', () => {
	const { container, getByText } = render(<DeleteRecords numRowsSelected={1} />);

	fireEvent.click(container.querySelector('button'));

	getByText('Delete 1 record?');
});

test('Delete button delete warning removes warning when delete is confirmed', async () => {
	const { container, getByText } = render(<DeleteRecords numRowsSelected={1} />);
	let items = container.querySelector('.table-header-delete-warning');
	expect(items).toBeFalsy();

	fireEvent.click(container.querySelector('button'));
	items = await getByText('Yes');
	expect(items).toBeTruthy();

	fireEvent.click(getByText('Yes'));
	items = await container.querySelector('.table-header-delete-warning');
	expect(items).toBeFalsy();
});
