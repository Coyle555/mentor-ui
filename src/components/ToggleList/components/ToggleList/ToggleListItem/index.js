import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';

export const ToggleListItem = ({ content, title }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="mui-toggle-list-item">
			<div className="title" onClick={() => setExpanded(!expanded)}>
				<Spring
					from={{ transform: 'rotate(0deg)' }}
					to={{ transform: `rotate(${expanded ? 90 : 0}deg)` }}
				>
					{ props => <i className="fas fa-caret-right icon" style={props} /> }
				</Spring>
				{title}
			</div>
			{ expanded &&
				<Spring
					from={{ opacity: 0 }}
					to={{ opacity: 1 }}
				>
					{ props => (
						<div className="content" style={props}>
							{content}
						</div>
					)}
				</Spring>
			}
		</div>
	);
};

ToggleListItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
	title: PropTypes.string.isRequired
};
