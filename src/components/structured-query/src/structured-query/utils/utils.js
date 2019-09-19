import {
	ALL_OPERATIONS,
	ENUM_OPERATIONS,
	NUM_DATE_OPERATIONS,
	STRING_OPERATIONS
} from '../constants';

// make sure a token is valid before the structured filter uses it
export function validateToken(token) {
	if (typeof token !== 'object'
		|| !token.id
		|| !token.label
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
export function _getOptionsForTypeahead(fields = [], token = {}) {
	if (!token.label) {

		return fields.map(field => field.label);

	} else if (!token.operator) {
		let labelType = _getLabelDataType(fields, token.id);

		switch (labelType) {
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
			default:
				return [];
		}
	} else {
		return _getLabelOptions(fields, token.id);
	}
}


// Get the data type of a label
// defaults to string if an error occurs
export function	_getLabelDataType(fields = [], id) {
	let label = fields.find(field => field.id === id);

	if (!label) {
		return 'string';
	}

	if (!!label.options) {
		return 'enumoptions';
	} else {
		return label.type || 'string';
	}
}

// Get the available options(enum) if any were passed in with the 
// options object
export function _getLabelOptions(fields = [], id) {
	const label = fields.find(field => field.id === id);

	if (!label) return [];
	
	// default case for boolean data types
	if (label.type === 'boolean' && !label.options) {
		return ['True', 'False'];
	}

	return label.options;
}

// get the parse functions for an options list if it exists
export function _getParseForOptions(fields = [], token) {
	if (fields.length === 0 || !token.id || !token.label || !token.operator) {
		return null;
	}

	const field = fields.find(field => field.id === token.id);
	return field.parse;
}

// gets the next header to display over the selectable list of options
export function _getHeader(nextToken = {}) {
	if (nextToken.label === '') {
		return 'Field';
	} else if (nextToken.operator === '') {
		return 'Operator';
	} else {
		return 'Value';
	}
}

// Get the input data type after a user selects a label and operation
// Used to render possible operations on that data
// Renders to string if label and operator have been selected
export function _getInputDatatype(token, fields) {
	if (!!token.label && !!token.operator) {
		return _getLabelDataType(fields, token.id);
	}

	return 'string';
}

// Check a token against the current list of tokens for duplicates
export function _isDuplicateToken(tokens, newToken, parse) {
	let newTokenValue = typeof parse === 'function'
		? parse(newToken.value)
		: newToken.value;
	let tokenValue;

	return tokens.some(token => {
		tokenValue = typeof parse === 'function'
			? parse(token.value)
			: token.value;

		return token.label === newToken.label &&
			token.operator === newToken.operator &&
			tokenValue === newTokenValue;
	}, this);
}
