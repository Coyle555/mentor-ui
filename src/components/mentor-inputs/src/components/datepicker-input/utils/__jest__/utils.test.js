import { getDateFormat, getPlaceholder } from '../utils';

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
