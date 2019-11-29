import moment from 'moment';

const DEFAULT_FORMAT_MASKS = {
	datetime: 'MMM DD, YYYY, hh:mm a',
	date: 'MMM DD, YYYY',
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
