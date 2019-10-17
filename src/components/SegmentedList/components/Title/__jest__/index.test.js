import React from 'react';
import { Title } from '../index';
import renderer from 'react-test-renderer';

test('Rendering title with just the title', () => {
	const tree = renderer.create(<Title title="test" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering title with just inserting functionality', () => {
	const tree = renderer.create(
		<Title insertable={true} onInsertClick={() => {}} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering with both title and insertability', () => {
	const tree = renderer.create(
		<Title
			insertable={true}
			onInsertClick={() => {}}
			title="test"
		/>
	).toJSON();

	expect(tree).toMatchSnapshot();
});
