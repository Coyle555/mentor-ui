import React from 'react';
import { TypeaheadOption } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of a typeahead option', () => {
	const tree = renderer.create(<TypeaheadOption />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Option with a custom list item class', () => {
	const tree = renderer.create(<TypeaheadOption customClasses={{ listItem: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Option with a custom list anchor link class', () => {
	const tree = renderer.create(<TypeaheadOption customClasses={{ listAnchor: 'bar' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Option that is active', () => {
	const tree = renderer.create(<TypeaheadOption active={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Option label passed in', () => {
	const tree = renderer.create(<TypeaheadOption option="foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Option list item clicked', () => {
	const onClick = jest.fn();
	const { getByText } = render(<TypeaheadOption onClick={onClick} option="foo" />);

	fireEvent.click(getByText('foo'));
	expect(onClick).toHaveBeenCalledWith('foo');
});
