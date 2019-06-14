import React from 'react';
import { NoResults } from '../NoResults';
import renderer from 'react-test-renderer';

test('Default render of no results in a table', () => {
	const tree = renderer.create(<NoResults />).toJSON();

	expect(tree).toMatchSnapshot();
});
