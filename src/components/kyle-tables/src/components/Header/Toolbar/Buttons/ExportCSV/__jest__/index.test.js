import React from 'react';
import { ExportCSV } from '../index';
import renderer from 'react-test-renderer';

test('Export CSV button default render', () => {
	const tree = renderer.create(<ExportCSV csvURL="" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Export CSV disabled button', () => {
	const tree = renderer.create(<ExportCSV disabled={true} csvURL="" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Export CSV with a url', () => {
	const tree = renderer.create(<ExportCSV csvURL="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});
