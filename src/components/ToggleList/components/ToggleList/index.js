import React from 'react';
import PropTypes from 'prop-types';

import { ToggleListItem } from './ToggleListItem';

import '../../styles.less';

export const ToggleList = ({ customClasses, expanded, list }) => {
	return (
		<div className="mui-toggle-list">
			{list.map((item, i) => (
				<ToggleListItem
					customClasses={customClasses}
					content={item.content}
					expanded={expanded}
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
	expanded: PropTypes.bool,
	list: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.oneOfType([
			PropTypes.element, PropTypes.string
		]).isRequired,
		title: PropTypes.string.isRequired,
	})),
};

ToggleList.defaultProps = {
	customClasses: {},
	expanded: false,
	list: []
};
