import React from 'react';
import { DeleteRecords } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

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
	const onDeleteClick = jest.fn();
	const { container, getByText } = render(
		<DeleteRecords onDeleteClick={onDeleteClick} numRowsSelected={1} />);

	let items = container.querySelector('.table-header-delete-warning');
	expect(items).toBeFalsy();

	fireEvent.click(container.querySelector('button'));
	items = await getByText('Yes');
	expect(items).toBeTruthy();

	fireEvent.click(getByText('Yes'));
	items = await container.querySelector('.table-header-delete-warning');
	expect(items).toBeFalsy();

	expect(onDeleteClick).toHaveBeenCalled();
});
