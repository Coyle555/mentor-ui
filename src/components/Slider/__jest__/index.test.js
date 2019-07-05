import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
} from '@testing-library/react';

import {
	Slider,
	calcHandlePos,
	getHandleStyle,
	getValueWidthStyle,
	normalizer,
	onMove,
} from 'components/Slider';

beforeEach(cleanup);

describe('Slider component', () => {
	it('Should default render', () => {
		const { container } = render(<Slider />);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with className prop', () => {
		const className = "RidelsMPA";
		const { container } = render(
			<Slider
				className={className}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with prop defaultPercentage prop', () => {
		const { container } = render(
			<Slider
				defaultPercentage={75}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should invoke onChange callback when handle is clicked', () => {
		const onChange = jest.fn(per => per);

		const { container, getByTestId } = render(
			<Slider
				onChange={onChange}
			/>
		);

		fireEvent.mouseDown(getByTestId('slider-handle'));

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	test('normalizer function should keep a given value within a min and max value', () => {
		expect(normalizer(110, 0, 100)).toEqual(100);
		expect(normalizer(-100, 0, 100)).toEqual(0);
		expect(normalizer(50, 0, 100)).toEqual(50);
	});

	test('getValueWidthStyle function should return a css string', () => {
		const pos = 25;
		const knobSize = 10;

		expect(getValueWidthStyle(
			pos,
			knobSize,
		)).toMatch("calc(25% + 5px)");
	});

	test('getHandleStyle function should return a css string', () => {
		const pos = 25;
		const operator = 10;
		const offset = 10;

		expect(getHandleStyle(
			pos,
			'+',
			offset,
		)).toMatch("calc(25% + 10px)");
	});

	describe('calcHandlePos function', () => {
		const percentage = 60;
		const knobSize = 10;
		const width = 100;

		it('should return an offset percentage', () => {
			const [newPercentage, _] = calcHandlePos(
				percentage,
				knobSize,
				width,
			);

			const mockPercentage = percentage - (percentage * knobSize / width);

			expect(newPercentage).not.toEqual(percentage);
			expect(newPercentage).toEqual(mockPercentage);
		});

		it('should return a positive operator if knob percentage plus percentage is greater than or equal to 100%', () => {
			const [newPercentage, operator] = calcHandlePos(
				95,
				knobSize,
				width,
			);

			expect(operator).toMatch('+');
		});

		it('should return a negative operator if knob percentage plus percentage is less than 100%', () => {
			const [newPercentage, operator] = calcHandlePos(
				94,
				knobSize,
				width,
			);

			expect(operator).toMatch('-');
		});

		it('Should have 0 as default perentage', () => {
			const [newPercentage, _] = calcHandlePos(
				_,
				knobSize,
				width,
			);

			expect(newPercentage).toEqual(0);
		});
	});

	describe('onMove function', () => {
		const sliderRect = { x: 10, width: 100 };
		const event = { clientX: 50 };
		const knobSize = 10;
		const setPercentage = jest.fn(per => per);

		it('should always invoke callback', () => {
			onMove(
				sliderRect,
				setPercentage,
				knobSize,
				normalizer,
			)(event);

			expect(setPercentage).toBeCalledTimes(1);
			setPercentage.mockClear();
		});

		it('should invoke callback with new percentage', () => {
			onMove(
				sliderRect,
				setPercentage,
				knobSize,
				normalizer,
			)(event);

			expect(setPercentage.mock.results[0].value)
				.toEqual(38);
		});
	})
});
