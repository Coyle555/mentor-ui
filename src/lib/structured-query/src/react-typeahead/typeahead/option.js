import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Typeahead option displays a single option in 
// a list of all options
export const TypeaheadOption = ({ active, customClasses, onClick, option }) => {

	let listItemClasses = classNames({
		'hover': active,
		'filter-tokenizer-list__item': true,
		[customClasses.listItem]: !!customClasses.listItem
	});

	let linkClasses = classNames({
		'typeahead-option filter-tokenizer-list__item': true,
		[customClasses.listAnchor]: !!customClasses.listAnchor
	});

	return (
		<li className={listItemClasses} onClick={() => onClick(option)}>
			<a className={linkClasses}>
				{option}
			</a>
		</li>
	);
};

TypeaheadOption.propTypes = {
	active: PropTypes.bool,
	customClasses: PropTypes.object,
	onClick: PropTypes.func,
	option: PropTypes.string
}

TypeaheadOption.defaultProps = {
	active: false,
	customClasses: {}
}
