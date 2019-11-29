import { getDateFormat, getPlaceholder, isValidDate } from '../utils';

const datetime = 'MMM DD, YYYY, hh:mm a';
const date = 'MMM DD, YYYY';

const datetimePlaceholder = 'Enter date and time';
const datePlaceholder = 'Enter date';

describe('Get date format util function', () => {

	test('Datetime format', () => {
		expect(getDateFormat('datetime')).toBe(datetime);
	});

	test('Date format', () => {
		expect(getDateFormat('date')).toBe(date);
	});
});

describe('Get placeholder util function', () => {

	test('Datetime format', () => {
		expect(getPlaceholder('datetime')).toBe(datetimePlaceholder);
	});

	test('Date format', () => {
		expect(getPlaceholder('date')).toBe(datePlaceholder);
	});
});

describe('isValidDate util function', () => {
	
	describe('Datetime values', () => {
		test.only('Value is not same length as mask', () => {
			expect(isValidDate('Aug', datetime)).toBe(false);
		});

		test('In correct format', () => {
			expect(isValidDate('Aug 31, 1999, 12:35 pm', datetime, 'datetime')).toBe(true);
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

	describe('Date values', () => {
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
});
