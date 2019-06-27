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
	} else if (type === 'datetime' || type === 'date') {
		return value.toString();
	// handle objects with a name field
	} else if (valueType === 'object' && value.name) {
		return value.name;
	}

	return '';
};
