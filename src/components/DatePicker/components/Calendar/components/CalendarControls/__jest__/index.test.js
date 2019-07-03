import React from 'react';
import {
	cleanup,
	render,
	fireEvent,
} from '@testing-library/react';
import moment from 'moment';

import {
	CalendarControls,
} from '../';

beforeEach(cleanup);

describe('CalendarControls component', () => {
	it('Should match snapshot with base props', () => {
		const { container } = render(
			<CalendarControls
				title='Broccoli'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with className prop', () => {
		const className = 'coconut-oil';
		const { container } = render(
			<CalendarControls
				className={className}
				title='Broccoli'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	test('Clicking on right button should invoke callback', () => {
		const mockButtonCallback = jest.fn(foo => 'oof');
		const { getByTestId } = render(
			<CalendarControls
				title='Broccoli'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={mockButtonCallback}
			/>
		);

		fireEvent.click(getByTestId('right-button'));

		expect(mockButtonCallback).toHaveBeenCalledTimes(1);
		expect(JSON.stringify(mockButtonCallback.mock.results[0])).toMatch(/oof/);
	});

	test('Clicking on left button should invoke callback', () => {
		const mockButtonCallback = jest.fn(foo => 'oof');
		const { getByTestId } = render(
			<CalendarControls
				title='Broccoli'
				leftButtonOnClick={mockButtonCallback}
				rightButtonOnClick={() => {}}
			/>
		);

		fireEvent.click(getByTestId('left-button'));

		expect(mockButtonCallback).toHaveBeenCalledTimes(1);
		expect(JSON.stringify(mockButtonCallback.mock.results[0])).toMatch(/oof/);
	});

	test('Passing in leftButtonDisabled prop should disable right button', () => {
		const { getByTestId } = render(
			<CalendarControls
				title='Broccoli'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={() => {}}
				leftButtonDisabled
			/>
		);

		const button = getByTestId('left-button');

		expect(button.hasAttribute('disabled')).toBe(true);
	});

	test('Passing in rightButtonDisabled prop should disable right button', () => {
		const { getByTestId } = render(
			<CalendarControls
				title='Broccoli'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={() => {}}
				rightButtonDisabled
			/>
		);

		const button = getByTestId('right-button');

		expect(button.hasAttribute('disabled')).toBe(true);
	});

	it('Should match snapshot when passing in title prop', () => {
		const { container } = render(
			<CalendarControls
				title='Lectins'
				leftButtonOnClick={() => {}}
				rightButtonOnClick={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
