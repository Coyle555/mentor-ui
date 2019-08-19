jest.mock('react-color', () => {
	return { ChromePicker: (props) => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { EditColorPicker } from '../index';
import renderer from 'react-test-renderer';

test('Default edit color picker render', () => {
	const tree = renderer.create(<EditColorPicker />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Color picker with a color passed in', () => {
	const tree = renderer.create(<EditColorPicker color="#000" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Color picker change', () => {
	const onColorChange = jest.fn();

	const instance = renderer.create(
		<EditColorPicker
			colId="foo"
			onColorChange={onColorChange}
			rowId="bar"
		/>
	).getInstance();

	instance.onColorChange({ hex: '#000' });

	expect(instance.state.color).toEqual({ hex: '#000' });
	expect(onColorChange).toHaveBeenCalledWith('bar', { 'foo': '#000' });
});
