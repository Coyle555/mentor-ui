import React from 'react';
import { RecordCount } from '../index';
import renderer from 'react-test-renderer';

test('Default render of record count', () => {
	const tree = renderer.create(<RecordCount />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Record count render with no viewable entries', () => {
	const tree = renderer.create(<RecordCount entriesViewable={0} />).toJSON();

	expect(tree).toMatchSnapshot();
});

