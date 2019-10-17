import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ToggleListItem } from './ToggleListItem';

import '../../styles.less';

export const ToggleList = ({ customClasses, list }) => {
	return (
		<div className="mui-toggle-list">
			{ list.map((item, i) => (
				<ToggleListItem
					customClasses={customClasses}
					content={item.content}
					key={item.title + i}
					title={item.title}
				/>
			))}
		</div>
	);
};

ToggleList.propTypes = {
	customClasses: PropTypes.shape({
		content: PropTypes.string,
		title: PropTypes.string
	}),
	list: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.oneOfType([
			PropTypes.element, PropTypes.string
		]).isRequired,
		title: PropTypes.string.isRequired,
	}))
};

ToggleList.defaultProps = {
	customClasses: {},
	list: []
};
