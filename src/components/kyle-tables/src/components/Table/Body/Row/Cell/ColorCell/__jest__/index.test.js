jest.mock('react-color', () => {
	return { SliderPicker: (props) => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { ColorCell } from '../index';
import renderer from 'react-test-renderer';

test('Default color picker render', () => {
	const tree = renderer.create(<ColorCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Color picker with a color passed in', () => {
	const tree = renderer.create(<ColorCell color="#000" />).toJSON();

	expect(tree).toMatchSnapshot();
});
