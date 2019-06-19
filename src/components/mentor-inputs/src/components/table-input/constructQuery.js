// hard limit on number of records returned
const HARD_LIMIT = 25;
const FILTER_REGEX = /{"(.*)":\s*"(.*)"}/;

// filter mappings from english to the url in the address bar
const filterToURL = {
	'equals': '==',
	'does not equal': '!=',
	'contains': 'contains',
	'does not contain': '!contains',
	'less than': '<',
	'less than or equal to': '<=',
	'greater than': '>',
	'greater than or equal to': '>=',
	'is empty': 'is empty',
	'is not empty': 'is not empty'
};

// filter mappings from the url to a token
const urlToFilter = {
	'==': 'equals',
	'!=': 'does not equal',
	'!': 'does not equal',
	'contains': 'contains',
	'!contains': 'does not contain',
	'<': 'less than',
	'<=': 'less than or equal to',
	'>': 'greater than',
	'>=': 'greater than or equal to'
};

// Constructs a query to append to a url for querying the server
//
// @limit(Number) - number of records to fetch
// @page(Number) - page of records to grab
// 		defaults to 1
// @sortId(string) - id of the column to sort 
// @sortDir(string) - which way to sort the column
// @filters([Object]) - an array of objects that can be added for filtering
// 	contains:
// 		id: column id to filter
// 		operator: operation to perform on the column
// 		value: value to use with operation
// @query(string) - a string that is a valid query that will be used
// 	instead of constructing a url
// @return - a string with a valid query
export function constructQuery({
	limit = 0,
	page = 0,
	sortId = null,
	sortDir = null,
	filters = []
}) {
	const query = [];

	if (page > 0) {
		query.push(`page=${page}`);
	}

	// if we know how many records to fetch
	if (limit > 0) {
		if (limit > HARD_LIMIT) {
			limit = HARD_LIMIT;
		}

		query.push(`limit=${limit}`);
	}

	// add a sort
	if (sortId && sortDir) {
		query.push(`sort=${sortId} ${sortDir}`);
	}

	// add any filtering
	if (Array.isArray(filters) && filters.length > 0) {
		filters.forEach((filter) => {
			// ignore all invalid filters
			if ((!filterToURL[filter.operator]
				&& !Object.keys(urlToFilter).includes(filter.operator))) {

				return;
			}

			let operator = filterToURL[filter.operator] || filter.operator;

			let value = !!filter.value && typeof filter.value === 'object'
				? filter.value.id
				: filter.value;

			if (!!value) {
				value = value.toString().replace(/%/g, '%25');
			}

			// check for == or != first to map to proper query
			// else just send an object with the query back
			if (operator === '==') {
				query.push(`${filter.id}=${value}`);
			} else if (operator === '!=') {
				query.push(`${filter.id}={"!":"${value}"}`);
			} else if (operator === 'is empty') {
				query.push(`${filter.id}={"==":"nullOrEmpty"}`);
			} else if (operator === 'is not empty') {
				query.push(`${filter.id}={"!":"nullOrEmpty"}`);
			} else {
				query.push(`${filter.id}={"${operator}":"${value}"}`);
			}
		});
	}

	return query.length > 0 ? `?${query.join('&')}` : '';
};
