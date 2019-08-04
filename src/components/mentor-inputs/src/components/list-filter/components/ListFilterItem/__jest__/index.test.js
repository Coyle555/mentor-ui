import React from 'react';
import { ListFilterItem } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of a list filter item', () => {
	const tree = renderer.create(<ListFilterItem />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of a list filter item with a custom class', () => {
	const tree = renderer.create(<ListFilterItem listClasses={{ item: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Rendering a list filter item with a custom component', () => {
	const CustomComponent = (props) => <div>{JSON.stringify(props)}</div>;

	const tree = renderer.create(
		<ListFilterItem CustomListItem={CustomComponent} option="foo" />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Moving mouse cursor over a list filter item', () => {
	const onMouseOver = jest.fn();
	const { getByText } = render(
		<ListFilterItem index={0} onMouseOver={onMouseOver} option="foo" />
	);

	fireEvent.mouseOver(getByText('foo'));
	expect(onMouseOver).toHaveBeenCalledWith(0);
});

test('Clicking on a list filter item', () => {
	const onClick = jest.fn();
	const { getByText } = render(
		<ListFilterItem onClick={onClick} option="foo" />
	);

	fireEvent.click(getByText('foo'));
	expect(onClick).toHaveBeenCalledWith('foo');
});
