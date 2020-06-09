import moment from 'moment';

const DEFAULT_FORMAT_MASKS = {
	datetime: 'MMM DD, YYYY, h:mm A',
	date: 'MMM DD, YYYY',
};

const DATE_REGEX = {
	date: /^\w{3}\s{1}\d{1,2},\s{1}\d{4}$/,
	datetime: /^\w{3}\s{1}\d{1,2},\s{1}\d{4},\s{1}\d{1,2}:\d{2}\s{1}(AM|PM)$/,
};

const DEFAULT_FORMAT_MASKS_FOR_PICKER = {
	datetime: 'MMM dd, yyyy, h:mm a',
	date: 'MMM dd, yyyy',
};

const PLACEHOLDER = {
	datetime: 'Enter date and time',
	date: 'Enter date'
};

export function getDateFormat(type) {
	return DEFAULT_FORMAT_MASKS[type];
}

export function getDateFormatForPicker(type) {
	return DEFAULT_FORMAT_MASKS_FOR_PICKER[type];
}

export function getPlaceholder(type) {
	return PLACEHOLDER[type];
}

export function isValidDate(value, mask) {
	return moment(value, mask, true).format() !== 'Invalid date';
}

// validation as the user enters input directly
export function isValidDateOnInput(value, type) {
	return DATE_REGEX[type].test(value);
}
