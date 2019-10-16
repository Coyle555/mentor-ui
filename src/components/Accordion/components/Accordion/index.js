import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AccordionItem } from './AccordionItem';

import '../../styles.less';

export const Accordion = ({ list }) => {
	return (
		<div className="mui-accordion">
			{ list.map((item, i) => (
				<AccordionItem
					content={item.content}
					key={item.title + i}
					title={item.title}
				/>
			))}
		</div>
	);
};

Accordion.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.oneOfType([
			PropTypes.element, PropTypes.string
		]).isRequired,
		title: PropTypes.string.isRequired,
	}))
};

Accordion.defaultProps = {
	list: []
};
