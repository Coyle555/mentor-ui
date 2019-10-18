import React from 'react';
import { InsertListItem } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of insert list item button', () => {
	const onClick = () => {};
	const tree = renderer.create(<InsertListItem onClick={onClick} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Clicking the insert list item button', () => {
	const onClick = jest.fn();
	const { getByText } = render(<InsertListItem onClick={onClick} />);

	fireEvent.click(getByText('Add Items'));
	expect(onClick).toHaveBeenCalled();
});
