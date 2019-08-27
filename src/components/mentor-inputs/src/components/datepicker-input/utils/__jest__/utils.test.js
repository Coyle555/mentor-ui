import { getDateFormat, getPlaceholder, isValidDate } from '../utils';

const datetime = 'MMM DD, YYYY - hh:mm a';
const date = 'MMM DD, YYYY';
const time = 'hh:mm a';

describe('Get date format util function', () => {

	test('Datetime format', () => {
		expect(getDateFormat('datetime')).toBe('MMM DD, YYYY - hh:mm a');
	});

	test('Date format', () => {
		expect(getDateFormat('date')).toBe('MMM DD, YYYY');
	});

	test('Time format', () => {
		expect(getDateFormat('time')).toBe('hh:mm a');
	});
});

describe('Get placeholder util function', () => {

	test('Datetime format', () => {
		expect(getPlaceholder('datetime')).toBe('Enter date and time - [mon dd, yyyy - hh:mm am/pm]');
	});

	test('Date format', () => {
		expect(getPlaceholder('date')).toBe('Enter date - [mon dd, yyyy]');
	});

	test('Time format', () => {
		expect(getPlaceholder('time')).toBe('Enter time - [hh:mm am/pm]');
	});
});

describe('Is valid date util function', () => {
	
	describe('Datetime values', () => {
		test('Value is not same length as mask', () => {
			expect(isValidDate('Aug', datetime, 'datetime')).toBe(false);
		});

		test('In correct format', () => {
			expect(isValidDate('Aug 31, 1999 - 12:35 pm', datetime, 'datetime')).toBe(true);
		});

		test('Not in correct format', () => {
			expect(isValidDate('August 31, 1999 - 12:35 pm', datetime, 'datetime')).toBe(false);
		});
		
		test('Outside of boundaries of datetime', () => {
			expect(isValidDate('Aug 40, 1999 - 12:35pm', datetime, 'datetime')).toBe(false);
			expect(isValidDate('Aug 12, 1999 - 27:35pm', datetime, 'datetime')).toBe(false);
			expect(isValidDate('Aug 12, 1999 - 12:65pm', datetime, 'datetime')).toBe(false);
		});
	});

	describe('Datetime values', () => {
		test('Value is not same length as mask', () => {
			expect(isValidDate('Aug', date, 'date')).toBe(false);
		});

		test('In correct format', () => {
			expect(isValidDate('Aug 31, 1999', date, 'date')).toBe(true);
		});

		test('Not in correct format', () => {
			expect(isValidDate('August 31, 1999', date, 'date')).toBe(false);
		});

		test('Outside of boundaries of date', () => {
			expect(isValidDate('Aug 40, 1999', date, 'date')).toBe(false);
		});
	});

	describe('Time values', () => {
		test('Value is not same length as mask', () => {
			expect(isValidDate('10', time, 'time')).toBe(false);
		});

		test('In correct format', () => {
			expect(isValidDate('10:34 pm', time, 'time')).toBe(true);
		});

		test('Not in correct format', () => {
			expect(isValidDate('10:33', time, 'time')).toBe(false);
		});

		test('Outside of boundaries of time', () => {
			expect(isValidDate('27:12 am', time, 'time')).toBe(false);
			expect(isValidDate('10:65 am', time, 'time')).toBe(false);
		});
	});
});
