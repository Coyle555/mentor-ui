import React from 'react';
import { NextRecord } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test('Next record does not exist', () => {
	const tree = renderer.create(<NextRecord hasNext={false} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Next record with a custom label', () => {
	const tree = renderer.create(<NextRecord label="Foo" hasPrevious={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Clicking the next record if it exists', () => {
	const onClick = jest.fn();
	const { getByText } = render(<NextRecord hasNext={true} onNextClick={onClick} />);

	fireEvent.click(getByText('Next Record'));
	expect(onClick).toHaveBeenCalled();
});

