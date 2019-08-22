import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../text-input/textInput'

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

const UrlInput = ({ validation, ...props }) => {

	// return a better error message than what some browsers provide ('Match the requested format')
	// but use have the browser determine if theres an error
	/// (Im doing the regex test as well because the testing environment returns an empyt object for input.validity)
	function isUrl(value, input) {

		//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
		if (value.length && !URL_REGEX.test(value)) {
			return 'Not a valid URL.';
		} else if (typeof validation === 'function') {
			const customError = validation(value, input);
			return customError;
		}
	}

	return (
		<TextInput
			{...props}
			icon="fal fa-link"
			placeholder="Enter URL"
			validation={isUrl}
		/>		
	)
}

export default UrlInput;
