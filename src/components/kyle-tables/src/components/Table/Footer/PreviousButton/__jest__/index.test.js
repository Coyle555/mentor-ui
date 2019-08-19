import React from 'react';
import { PreviousButton } from '../index';
import renderer from 'react-test-renderer';

test('Default render of previous button', () => {
	const tree = renderer.create(<PreviousButton />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Previous button with the previous enabled', () => {
	const tree = renderer.create(<PreviousButton hasPrevious={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Previous button with onClick callback', () => {
	const onClick = jest.fn();

	const tree = renderer.create(<PreviousButton onClick={onClick} />).toJSON();

	expect(tree).toMatchSnapshot();
});
