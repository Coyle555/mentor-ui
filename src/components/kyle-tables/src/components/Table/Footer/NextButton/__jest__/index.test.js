import React from 'react';
import { NextButton } from '../index';
import renderer from 'react-test-renderer';

test('Default render of next button', () => {
	const tree = renderer.create(<NextButton />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Next button with the next enabled', () => {
	const tree = renderer.create(<NextButton hasNext={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Next button with onClick callback', () => {
	const onClick = jest.fn();

	const tree = renderer.create(<NextButton onClick={onClick} />).toJSON();

	expect(tree).toMatchSnapshot();
});
