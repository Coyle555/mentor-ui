import React from 'react';
import {
	render,
	cleanup,
} from '@testing-library/react';
import moment from 'moment';

import {
	Time,
	changeMinutes,
	changeHours,
	calcDx,
} from '../';

beforeEach(cleanup);

describe('Time component', () => {
	const m = new moment('2028-12-12 12:12');

	it('Should default render', () => {
		const { container } = render(
			<Time
				moment={m}
				onChange={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('onChange should be called twice on render', () => {
		const mockOnChange = jest.fn((m) => m.hours());
		const { container } = render(
			<Time
				moment={m}
				onChange={mockOnChange}
			/>
		);

		expect(mockOnChange).toHaveBeenCalledTimes(2);
		expect(mockOnChange.mock.results[0].value)
			.toEqual(m.hours());
	});

	it('Should match snapshot with className', () => {
		const { container } = render(
			<Time
				className="Figs"
				moment={m}
				onChange={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	describe('Time methods', () => {
		const mockMoment = {
			hours: jest.fn((h) => h),
			minutes: jest.fn((m) => m),
		}

		const mockOnChange = jest.fn((m) => m.hours);
		const mockCalcDx = jest.fn((per, x, y) => 12);

		const clearMocks = () => {
			mockOnChange.mockClear();
			mockCalcDx.mockClear();
			mockMoment.minutes.mockClear();
		}

		describe('changeMinutes function', () => {
			const handleMinutes = changeMinutes(
				mockMoment,
				mockOnChange,
				mockCalcDx,
			);

			it('Should invoke all callbacks', () => {
				handleMinutes(100);

				expect(mockOnChange).toHaveBeenCalledTimes(1);
				expect(mockCalcDx).toHaveBeenCalledTimes(1);
				expect(mockMoment.minutes).toHaveBeenCalledTimes(1);

				clearMocks();
			});

			it('Should call moment with minutes', () => {
				handleMinutes(100);

				expect(mockMoment.minutes).toHaveBeenCalledWith(12);

				clearMocks();
			});

			it('Should call onChange with moment', () => {
				handleMinutes(100);

				expect(mockOnChange).toHaveBeenCalledWith(mockMoment);

				clearMocks();
			});

			it('Should call calcDx with percentage', () => {
				handleMinutes(100);

				expect(mockCalcDx).toHaveBeenCalledWith(100, 100, 59);

				clearMocks();
			});
		});

		describe('changeHours function', () => {
			const handleHours = changeHours(
				mockMoment,
				mockOnChange,
				mockCalcDx,
			);

			it('Should invoke all callbacks', () => {
				handleHours(100);

				expect(mockOnChange).toHaveBeenCalledTimes(1);
				expect(mockCalcDx).toHaveBeenCalledTimes(1);
				expect(mockMoment.hours).toHaveBeenCalledTimes(1);

				clearMocks();
			});

			it('Should call moment with minutes', () => {
				handleHours(100);

				expect(mockMoment.hours).toHaveBeenCalledWith(12);

				clearMocks();
			});

			it('Should call onChange with moment', () => {
				handleHours(100);

				expect(mockOnChange).toHaveBeenCalledWith(mockMoment);

				clearMocks();
			});

			it('Should call calcDx with percentage', () => {
				handleHours(100);

				expect(mockCalcDx).toHaveBeenCalledWith(100, 100, 23);

				clearMocks();
			});
		});

		describe('calcDx function', () => {
			expect(calcDx(30, 60, 100)).toEqual(50);
			expect(calcDx(50, 100, 60)).toEqual(30);
			expect(calcDx(10, 60, 100)).toEqual(17);
			expect(calcDx(10, 60, 100)).toEqual(17);
			expect(calcDx(80, 100, 20)).toEqual(16);
		});
	});
});
