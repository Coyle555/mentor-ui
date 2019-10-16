import React from 'react';
import PropTypes from 'prop-types';

import { Title } from './Title';

import '../styles.less';

export const SegmentedList = ({ children, insertable, title }) => {
	return (
		<div className="mui-segmented-list">
			{ (title || insertable) &&
				<Title
					insertable={insertable}
					title={title}
				/>
			}
			<ul className="mui-segmented-list-ul">
				{children}
			</ul>
		</div>
	);
};

SegmentedList.propTypes = {
	insertable: PropTypes.bool,
	title: PropTypes.string
};

SegmentedList.defaultProps = {
	insertable: false,
	title: ''
};
