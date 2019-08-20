import React from 'react';
import { PreviousRecord } from '../index';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test('Clicking the previous record', () => {
	const onClick = jest.fn();
	const { getByText } = render(<PreviousRecord onClick={onClick} />);

	fireEvent.click(getByText('Previous'));
	expect(onClick).toHaveBeenCalled();
});
