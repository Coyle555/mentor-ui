import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ToggleButton } from '../index';

afterEach(cleanup);

test('No children', () => {
	const tree = renderer.create(<ToggleButton childrenCount={0} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Expanded toggle button', () => {
	const tree = renderer.create(<ToggleButton childrenCount={1} expanded={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Collapsed toggle button', () => {
	const tree = renderer.create(<ToggleButton childrenCount={1} expanded={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Toggle button with a level of 3', () => {
	const tree = renderer.create(<ToggleButton childrenCount={1} level={3} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Clicking toggle button', () => {
	const onClick = jest.fn();
	const { container } = render(<ToggleButton childrenCount={1} onClick={onClick} />);

	fireEvent.click(container.querySelector('button'));
	expect(onClick).toHaveBeenCalled();
});
