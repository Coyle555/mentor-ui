import React from 'react';
import { SelectedOption } from '../selectedOption';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';

afterEach(cleanup);

test('Default render of selected option', () => {
	const tree = renderer.create(<SelectedOption />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Selected option with a string option', () => {
	const tree = renderer.create(<SelectedOption option="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Selected option with an option object', () => {
	const tree = renderer.create(<SelectedOption option={{ name: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Removing a selected option', () => {
	const onClick = jest.fn();
	const { container } = render(<SelectedOption onClick={onClick} option="foo" />);

	fireEvent.click(container.querySelector('i.fa.fa-times'));
	expect(onClick).toHaveBeenCalledWith('foo');
});
