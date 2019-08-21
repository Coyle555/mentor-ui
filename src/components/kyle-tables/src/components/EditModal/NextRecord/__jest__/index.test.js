import React from 'react';
import { NextRecord } from '../index';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

afterEach(cleanup);

test.skip('Clicking the next record', () => {
	const onClick = jest.fn();
	const { getByText } = render(<NextRecord label="Next" onClick={onClick} />);

	fireEvent.click(getByText('Next'));
	expect(onClick).toHaveBeenCalled();
});

test.skip('Passing down custom label', async () => {
	const { debug, queryByText } = render(<NextRecord label="Next" />);

	await wait(() => {
		expect(queryByText('Next')).toBeTruthy();
	});
});
