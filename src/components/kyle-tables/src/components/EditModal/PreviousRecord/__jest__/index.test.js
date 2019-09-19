import React from 'react';
import { PreviousRecord } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test('Previous record does not exist', () => {
	const tree = renderer.create(<PreviousRecord hasPrevious={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Previous record with a custom label', () => {
	const tree = renderer.create(<PreviousRecord label="Foo" hasPrevious={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Clicking the previous record if it exists', () => {
	const onClick = jest.fn();
	const { getByText } = render(<PreviousRecord hasPrevious={true} onPreviousClick={onClick} />);

	fireEvent.click(getByText('Previous Record'));
	expect(onClick).toHaveBeenCalled();
});

