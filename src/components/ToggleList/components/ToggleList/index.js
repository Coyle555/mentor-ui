import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ToggleListItem } from './ToggleListItem';

import '../../styles.less';

export const ToggleList = ({ list }) => {
	return (
		<div className="mui-toggle-list">
			{ list.map((item, i) => (
				<ToggleListItem
					content={item.content}
					key={item.title + i}
					title={item.title}
				/>
			))}
		</div>
	);
};

ToggleList.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.oneOfType([
			PropTypes.element, PropTypes.string
		]).isRequired,
		title: PropTypes.string.isRequired,
	}))
};

ToggleList.defaultProps = {
	list: []
};
