import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../text-input/textInput'

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

function isUrl(value) {
	return URL_REGEX.test(value)
		? true
		: 'Invalid url';
}

const UrlInput = ({ validate, ...props }) => {

	return (
		<TextInput
			placeholder="Enter URL"
			{...props}
			validate={[isUrl].concat(validate)}
		/>
	)
}

UrlInput.propTypes = {
	validate: PropTypes.func
};

export default UrlInput;
