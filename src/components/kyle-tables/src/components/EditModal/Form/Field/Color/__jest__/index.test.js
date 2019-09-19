jest.mock('react-color', () => {
	return { GithubPicker: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { ColorField } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Color picker with a color passed in', () => {
	const tree = renderer.create(<ColorField value="#000000" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Color picker with a new color passed in', () => {
	const tree = renderer.create(<ColorField value="#000000" />);
	tree.update(<ColorField value="#ffffff" />);

	expect(tree).toMatchSnapshot();
});

test('On color change callback', () => {
	const onColorChange = jest.fn();
	const instance = renderer.create(
		<ColorField
			fieldId="foo"
			onColorChange={onColorChange}
			rowId="baz"
			value="#000000"
		/>
	).getInstance();

	instance.onChangeComplete({ hex: '#00ffff' });
	expect(onColorChange).toHaveBeenCalledWith('baz', 'foo', '#00ffff');
});
