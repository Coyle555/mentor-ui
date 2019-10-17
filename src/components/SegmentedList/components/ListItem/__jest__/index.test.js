import React from 'react';
import { ListItem } from '../index';
import renderer from 'react-test-renderer';

test('Default render of list item', () => {
	const tree = renderer.create(<ListItem>Foo</ListItem>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Custom styling on a list item', () => {
	const tree = renderer.create(
		<ListItem style={{ width: '10px' }}>Foo</ListItem>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
