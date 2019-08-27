import moment from 'moment';

const DEFAULT_FORMAT_MASKS = {
	datetime: 'MMM DD, YYYY - hh:mm a',
	date: 'MMM DD, YYYY',
	time: 'hh:mm a'
};

const PLACEHOLDER = {
	datetime: 'Enter date and time - [mon dd, yyyy - hh:mm am/pm]',
	date: 'Enter date - [mon dd, yyyy]',
	time: 'Enter time - [hh:mm am/pm]'
};

export function getDateFormat(type) {
	return DEFAULT_FORMAT_MASKS[type];
}

export function getPlaceholder(type) {
	return PLACEHOLDER[type];
}

export function isValidDate(value, mask, type) {
	let valid;

	if (type === 'datetime') {
		valid = /^\D{3}\s\d{2},\s\d{4}\s-\s\d{2}:\d{2}\s(AM|PM)$/i.test(value);
	} else if (type === 'date') {
		valid = /^\D{3}\s\d{2},\s\d{4}$/i.test(value);
	} else if (type === 'time') {
		valid = /^\d{2}:\d{2}\s(AM|PM)$/i.test(value);
	}

	return valid ? new moment(value, mask).isValid() : false;
}
