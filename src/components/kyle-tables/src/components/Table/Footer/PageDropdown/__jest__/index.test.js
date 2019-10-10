jest.mock('mentor-inputs', () => {
	return { IntegerInput: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { PageDropdown } from '../index';
import renderer from 'react-test-renderer';

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
