import {
	ALL_OPERATIONS,
	ASYNC_OPERATIONS,
	ENUM_OPERATIONS,
	NUM_DATE_OPERATIONS,
	STRING_OPERATIONS
} from '../constants';

// make sure a token is valid before the structured filter uses it
export function validateToken(token) {
	if (typeof token !== 'object'
		|| !token.id
		|| !token.category
		|| !token.operator) {

		return false;
	}

	// no valid value when operation isnt a empty check
	if (!token.value
		&& token.operator !== ALL_OPERATIONS.IS_EMPTY
		&& token.operator !== ALL_OPERATIONS.IS_NOT_EMPTY) {

		return false;
	}

	// operation does not exist in list of approved operations
	if (!ALL_OPERATIONS[token.operator.toUpperCase().replace(/ /g, '_')]) {
		return false;
	}

	return true;
}

// Get the options available based on where the user is in the query
export function _getOptionsForTypeahead(options = [], token = {}) {
	if (!token.category) {

		return options.map(option => option.category);

	} else if (!token.operator) {
		let categoryType = _getCategoryDataType(options, token.id);

		switch (categoryType) {
			case 'string':
			case 'text':
			case 'email':
				return STRING_OPERATIONS;
			case 'enumoptions':
			case 'boolean':
				return ENUM_OPERATIONS;
			case 'integer':
			case 'float':
			case 'datetime':
			case 'date':
				return NUM_DATE_OPERATIONS;
			case 'async':
				return ASYNC_OPERATIONS;
			default:
				return [];
		}
	} else {
		return _getCategoryOptions(options, token.id);
	}
}


// Get the data type of a category
// defaults to string if an error occurs
export function	_getCategoryDataType(options, id) {
	let category = options.find(option => {
		return option.id === id;
	});

	if (!category) {
		return 'string';
	}

	if (!!category.options) {
		return 'enumoptions';
	} else if (!!category.asyncFilter) {
		return 'async';
	} else {
		return category.type || 'string';
	}
}

// Get the available options(enum) if any were passed in with the 
// options object
export function _getCategoryOptions(options = [], id) {
	let category = options.find(option => {
		return option.id === id;
	});

	if (!category) {
		return [];
	}
	
	// default case for boolean data types
	if (category.type === 'boolean' && !category.options) {
		return ['True', 'False'];
	}

	return category.options;
}

// gets the next header to display over the selectable list of options
export function _getHeader(nextToken = {}) {
	if (nextToken.category === '') {
		return 'Field';
	} else if (nextToken.operator === '') {
		return 'Operator';
	} else {
		return 'Value';
	}
}

// Get the input data type after a user selects a category and operation
// Used to render possible operations on that data
// Renders to string if category and operator have been selected
export function _getInputDatatype(token, options) {
	if (!!token.category && !!token.operator) {
		return _getCategoryDataType(options, token.id);
	}

	return 'string';
}

// Check a token against the current list of tokens for duplicates
export function _isDuplicateToken(tokens, newToken) {
	return tokens.some(token => {
		return token.category === newToken.category &&
			token.operator === newToken.operator &&
			token.value === newToken.value
	}, this);
}
