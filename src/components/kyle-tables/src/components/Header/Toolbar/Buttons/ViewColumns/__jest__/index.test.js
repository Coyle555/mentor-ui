import React from 'react';
import { ViewColumns } from '../index';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('View columns default render', () => {
	const tree = renderer.create(<ViewColumns />);

	expect(tree).toMatchSnapshot();
});

test('View columns render with disable', () => {
	const tree = renderer.create(<ViewColumns disabled={true} />);

	expect(tree).toMatchSnapshot();
});

test('View columns toggling columns', () => {
	const { container, getByLabelText } = render(
		<ViewColumns
			onDisplayColChange={() => {}}
			viewColumns={[
				{
					category: 'Foo',
					display: false,
					id: 'foo'
				},
				{
					category: 'Bar',
					display: false,
					id: 'bar'
				}
			]}
		/>
	);

	fireEvent.click(container.querySelector('button'));

	expect(container.querySelector('button.btn-table.active')).toBeTruthy();
	getByLabelText('Foo');
	getByLabelText('Bar');

	fireEvent.click(container.querySelector('button'));
	expect(container.querySelector('.table-header-columns-ul')).toBeFalsy();
});

test('View columns toggling a column on/off', () => {
	function onDisplayColChange(event) {
		expect(event.target.name).toBe('foo');
	}

	const { container, getByLabelText } = render(
		<ViewColumns
			onDisplayColChange={() => {}}
			viewColumns={[
				{
					category: 'Foo',
					display: false,
					id: 'foo'
				},
				{
					category: 'Bar',
					display: true,
					id: 'bar'
				}
			]}
		/>
	);

	fireEvent.click(container.querySelector('button'));
	fireEvent.click(getByLabelText('Foo'));
});
