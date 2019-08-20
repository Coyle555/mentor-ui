import React from 'react';
import { NextRecord } from '../index';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test('Clicking the next record', () => {
	const onClick = jest.fn();
	const { getByText } = render(<NextRecord label="Next" onClick={onClick} />);

	fireEvent.click(getByText('Next'));
	expect(onClick).toHaveBeenCalled();
});
