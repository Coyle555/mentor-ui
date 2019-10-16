import React from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const Accordion = ({ list }) => {
	return (
		<div className="mui-accordion">
			{ list.map((item, i) => (
				<div
					className="mui-accordion-list-item"
					key={item.title + i}
				>
					<div className="title">
						<i className="fas fa-caret-right" /> {item.title}
					</div>
					<div className="content">
						{item.content}
					</div>
				</div>
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

export default Accordion;
