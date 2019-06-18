import React from 'react';
import { TokenCell } from '../tokenCell';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';

afterEach(cleanup);

test('Default render of a token cell', () => {
	const tree = renderer.create(<TokenCell />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Token cell render with a token string', () => {
	const tree = renderer.create(<TokenCell token="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Token cell render with a token object', () => {
	const tree = renderer.create(<TokenCell token={{ name: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Token cell render with editMode and rowSelected', () => {
	const tree = renderer.create(<TokenCell editMode={true} rowSelected={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Token cell render with a delete onClick callback', () => {
	const onClick = jest.fn();

	const { getByTestId } = render(
		<TokenCell
			colId="bar"
			editMode={true}
			onClick={onClick}
			rowId="baz"
			rowSelected={true}
			token="foo"
		/>
	);

	fireEvent.click(getByTestId('token-delete'));
	expect(onClick).toHaveBeenCalledWith('baz', 'bar', 'foo');
});
