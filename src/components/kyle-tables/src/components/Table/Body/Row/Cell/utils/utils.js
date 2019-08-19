import { convertToTimeZone } from 'date-fns-timezone';

function convertDateTime(datetimeValue) {
	const datetime = Date.parse(new Date(datetimeValue));
	const region = new Intl.DateTimeFormat().resolvedOptions();
	const convertedDate = convertToTimeZone(datetime, { timeZone: region.timeZone });
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	return new Intl.DateTimeFormat('default', options).format(convertedDate);
}

function convertDate(dateValue) {
	const date = Date.parse(new Date(dateValue));
	const region = new Intl.DateTimeFormat().resolvedOptions();
	const convertedDate = convertToTimeZone(date, { timeZone: region.timeZone });
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	return new Intl.DateTimeFormat('default', options).format(convertedDate);
}

// Converts a cell value to a string
//
// @value(string|object|null|[object]) - the value passed into a cell
// @return(string) - the value in string format
export function convertCellToString(value, type) {
	if (value === null || value === undefined) {
		return '';
	}

	const valueType = typeof value;

	// handle primitive data types
	if (valueType === 'string' || valueType === 'number') {
		return value.toString();
	} else if (valueType === 'boolean') {
		return value.toString();
	} else if (type === 'datetime' && Date.parse(value)) {
		return convertDateTime(value);
	} else if (type === 'date' && Date.parse(value)) {
		return convertDate(value);
	// default to name field for objects
	} else if (valueType === 'object' && value.name) {
		return value.name;
	}

	return '';
};
