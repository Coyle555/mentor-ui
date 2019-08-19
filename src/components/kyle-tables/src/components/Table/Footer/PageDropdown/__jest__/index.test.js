import React from 'react';
import { PageDropdown } from '../pageDropdown';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, getByTestId, } from '@testing-library/react';

afterEach(cleanup);

test('Default render of page dropdown', () => {
	const tree = renderer.create(<PageDropdown />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Page dropdown with less than negative max page', () => {
	const tree = renderer.create(<PageDropdown recordCount={-5} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Page dropdown with infinity max page', () => {
	const tree = renderer.create(<PageDropdown pageSize={0} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Page dropdown onChange callback', () => {
	const onChange = jest.fn();

	const { getByTestId } = render(
		<PageDropdown
			onChange={onChange}
			currentPage={1}
			pageSize={10}
			recordCount={50}
		/>
	);

	fireEvent.change(getByTestId('pagedropdown'), { target: { value: '2' } });
	fireEvent.blur(getByTestId('pagedropdown'));
	expect(onChange).toHaveBeenCalledWith(2);
});
