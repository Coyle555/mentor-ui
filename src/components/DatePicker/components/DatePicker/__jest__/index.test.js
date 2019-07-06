jest.mock('../../Time', () => {
	return {
		Time: (props) => {
			return (
				<div data-testid='Time'>{JSON.stringify(props)}</div>
			);
		}
	}
});

jest.mock('../../Calendar', () => {
	return {
		Calendar: (props) => {
			return (
				<div data-testid='Calendar'>{JSON.stringify(props)}</div>
			);
		}
	}
});

jest.mock('components/TabNav', () => {
	return {
		TabNav: (props) => {
			const { onClick, activeTab, ...rest } = props;
			return (
				<div>
					<button onClick={onClick}>{activeTab}</button>
					{JSON.stringify(rest)}
				</div>
			);
		}
	}
});

jest.mock('../components/OptionalControl', () => {
	return {
		OptionalControl: (props) => {
			const { onClick, children, ...rest } = props;
			return (
				<div>
					<button onClick={onClick}>{children}</button>
					{JSON.stringify(rest)}
				</div>
			);
		}
	}
});

import React from 'react';
import {
	render,
	cleanup,
} from '@testing-library/react';
import Moment from 'moment';

import {
	DatePicker,
	onTabClick,
	isCallbackValid,
} from '../';

beforeEach(cleanup);

const getMoment = () => new Moment('2000-01-01');

describe('DatePicker Component', () => {
	it('Should match snapshot with base props', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should have overriding className from prop', () => {
		const m = getMoment();
		const className = 'bonobo';
		const { container } = render(
			<DatePicker
				moment={m}
				className={className}
				onChange={() => {}}
			/>
		);

		const classes = JSON.stringify(container.firstElementChild.classList);

		expect(classes).toMatch(/bonobo/);
	});

	it('Should have a className prefixed with APM', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
			/>
		);

		const classes = JSON.stringify(container.firstElementChild.classList[0]);

		expect(classes).toMatch(/^("APM).*/);
	});

	/**
	 * Test optional control render
	 */
	it('Should match snapshot with clearInput prop', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				clearInput={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with handleClose prop', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				handleClose={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with saveDate prop', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				saveDate={() => {}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	/**
	 * Test disabled render logic
	 */
	it('Should render time component only', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				isDateDisabled
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should render date component only', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				isTimeDisabled
			/>
		);

		expect(container).toMatchSnapshot();
	});

	/**
	 * Test min/max props
	 */
	it('Should match stapshot with minDate props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minDate='1999-01-01'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with maxDate props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				maxDate='1999-01-01'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with maxDate / and minDate props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minDate='1999-01-01'
				maxDate='9999-01-01'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with minHour props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minHour={10}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with maxHour props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				maxHour={10}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with min /maxHour props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minHour={2}
				maxHour={10}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with minMinute props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minMinute={15}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with maxMinute props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				maxMinute={15}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with min /maxMinute props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minMinute={11}
				maxMinute={49}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should match stapshot with all min /max props ', () => {
		const m = getMoment();
		const { container } = render(
			<DatePicker
				moment={m}
				onChange={() => {}}
				minDate={'0000-01-01'}
				maxDate={'9999-09-09'}
				minHour={11}
				maxHour={23}
				minMinute={11}
				maxMinute={49}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	describe('DatePicker methods', () => {
		describe('onTabClick function', () => {
			it('Should return a function', () => {
				expect(typeof onTabClick(() => {}) === 'function').toBe(true);
			});

			test('Returned function should invoke onTabClick callback', () => {
				const mockCallback = jest.fn(foo => 'bar');

				onTabClick(mockCallback)('test');

				expect(mockCallback).toHaveBeenCalledTimes(1);
				expect(mockCallback.mock.results[0].value).toBe('bar');
			});

			test('Callback should be called with label', () => {
				const mockCallback = jest.fn(foo => 'bar');

				onTabClick(mockCallback)('test');

				expect(mockCallback).toHaveBeenCalledWith('test');
			});
		});

		describe('isCallbackValid', () => {
			it('Should return true if argument is a function', () => {
				expect(isCallbackValid(() => {})).toBe(true);
			});

			it('Should return false if argument is not a function', () => {
				expect(isCallbackValid('test')).toBe(false);
			});
		});
	});
});
