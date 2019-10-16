import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

export const AccordionItem = ({ content, title }) => {
	const [expanded, setExpanded] = useState(false);
	const titleMotionProps = useSpring({
		display: 'inline-block',
		transform: `rotate(${expanded ? 90 : 0}deg)`,
	});

	return (
		<div className="mui-accordion-list-item">
			<div className="title" onClick={() => setExpanded(!expanded)}>
				<animated.div style={titleMotionProps}>
					<i className="fas fa-caret-right icon" />
				</animated.div>
				{title}
			</div>
			{ expanded && 
				<div className="content">
					{content}
				</div>
			}
		</div>
	);
};

AccordionItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
	title: PropTypes.string.isRequired
};
