import React from 'react';
import { ColorField } from '../index';
import renderer from 'react-test-renderer';

test('Color picker with a color passed in', () => {
	const tree = renderer.create(<ColorField color="#000" />).toJSON();

	expect(tree).toMatchSnapshot();
});
