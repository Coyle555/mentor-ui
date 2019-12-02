import moment from 'moment';

const datetimeFormat = 'MMM DD, YYYY, h:mm A';
const dateFormat = 'MMM DD, YYYY';

function convertDateTime(datetimeValue, isUtc) {
	console.log('datetime vlaue', datetimeValue);
	return isUtc
		? moment.utc(datetimeValue).local().format(datetimeFormat)
		: moment(datetimeValue, moment.ISO_8601).format(datetimeFormat);
}

function convertDate(dateValue, isUtc) {
	return isUtc
		? moment.utc(dateValue).local().format(dateFormat)
		: moment(dateValue, moment.ISO_8601).format(dateFormat);
}

// Converts a cell value to a string
//
// @value(string|object|null|[object]) - the value passed into a cell
// @return(string) - the value in string format
export function convertCellToString(value, type, isUtc) {
	if (value === null || value === undefined) {
		return '';
	}

	const valueType = typeof value;

	if (type === 'datetime' && Date.parse(value)) {

		return convertDateTime(value, isUtc);

	} else if (type === 'date' && Date.parse(value)) {

		return convertDate(value, isUtc);

	// handle primitive data types
	} else if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {

		return value.toString();


	// default to name field for objects
	} else if (valueType === 'object' && value.name) {

		return value.name;

	}

	return '';
};
