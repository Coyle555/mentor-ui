const EQUALS = 'equals';
const DOES_NOT_EQUAL = 'does not equal';
const CONTAINS = 'contains';
const DOES_NOT_CONTAIN = 'does not contain';
const LESS_THAN = 'less than';
const LESS_THAN_OR_EQUAL_TO = 'less than or equal to';
const GREATER_THAN = 'greater than';
const GREATER_THAN_OR_EQUAL_TO = 'greater than or equal to';
const IS_EMPTY = 'is empty';
const IS_NOT_EMPTY = 'is not empty';

// mapping used to check validity of initial tokens
export const ALL_OPERATIONS = {
	EQUALS,
	DOES_NOT_EQUAL,
	CONTAINS,
	DOES_NOT_CONTAIN,
	LESS_THAN,
	LESS_THAN_OR_EQUAL_TO,
	GREATER_THAN,
	GREATER_THAN_OR_EQUAL_TO,
	IS_EMPTY,
	IS_NOT_EMPTY
};

// operations for strings
export const STRING_OPERATIONS = [
	EQUALS,
	DOES_NOT_EQUAL,
	CONTAINS,
	DOES_NOT_CONTAIN,
	IS_EMPTY,
	IS_NOT_EMPTY
];
// operations for integers and dates
export const NUM_DATE_OPERATIONS = [
	EQUALS,
	DOES_NOT_EQUAL,
	LESS_THAN,
	LESS_THAN_OR_EQUAL_TO,
	GREATER_THAN,
	GREATER_THAN_OR_EQUAL_TO,
	IS_EMPTY,
	IS_NOT_EMPTY
];
// operations for enumerable options
export const ENUM_OPERATIONS = [
	EQUALS,
	DOES_NOT_EQUAL,
	IS_EMPTY,
	IS_NOT_EMPTY
];

export const ASYNC_OPERATIONS = [
	CONTAINS,
	DOES_NOT_CONTAIN,
	IS_EMPTY,
	IS_NOT_EMPTY
];

