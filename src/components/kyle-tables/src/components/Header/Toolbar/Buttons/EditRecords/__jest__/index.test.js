import React from 'react';
import { EditRecords } from '../index';
import renderer from 'react-test-renderer';

test('Default render of edit records is correct', () => {
	const tree = renderer.create(<EditRecords />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Edit records render with a callback is correct', () => {
	function onClick() {}

	const tree = renderer.create(<EditRecords onClick={onClick} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Edit records with disable enabled', () => {
	const tree = renderer.create(<EditRecords disabled={true} />);

	expect(tree).toMatchSnapshot();
});

test('Edit records with edit mode enabled', () => {
	const tree = renderer.create(<EditRecords editMode={true} />);

	expect(tree).toMatchSnapshot();
});

test('Edit records with edit mode disabled', () => {
	const tree = renderer.create(<EditRecords editMode={false} />);

	expect(tree).toMatchSnapshot();
});
