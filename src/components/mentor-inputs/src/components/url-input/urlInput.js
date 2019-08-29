import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text-input/textInput'

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const UrlInput = ({ validate = [], ...props }) => {

	function isUrl(value) {
		return URL_REGEX.test(value);
	}

	return (
		<TextInput
			{...props}
			placeholder="Enter URL"
			validate={[isUrl].concat(validate)}
		/>		
	)
}

export default UrlInput;
