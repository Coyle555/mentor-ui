jest.mock('../ToggleListItem', () => {
	return { ToggleListItem: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import renderer from 'react-test-renderer';
import { ToggleList } from '../index';

test('Default render of a non-expanded toggle list', () => {
	const tree = renderer.create(
		<ToggleList list={[
			{ title: 'Foo', content: 'Foo content' },
			{ title: 'Bar', content: 'Bar content' },
			{ title: 'Baz', content: 'Baz content' },
		]} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Default render of an expanded toggle list', () => {
	const tree = renderer.create(
		<ToggleList
			expanded={true}
			list={[
				{ title: 'Foo', content: 'Foo content' },
				{ title: 'Bar', content: 'Bar content' },
				{ title: 'Baz', content: 'Baz content' },
			]}
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
