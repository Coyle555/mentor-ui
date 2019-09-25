import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ToggleButton = ({ childrenCount, expanded, level, loading, onClick }) => {
	if (childrenCount < 1) return null;
	
	return (
		<button
			className={classNames(
				expanded 
					? 'node-collapse-button'
					: 'node-expand-button'
			)}
			disabled={loading}
			onClick={onClick}
			style={{ left: 22 + (44 * level) + 'px' }}
			type="button"
		>
			{ expanded
				? <i className="fas fa-minus" />
				: <i className="fas fa-plus" />
			}
		</button>
	);
};

ToggleButton.propTypes = {
	childrenCount: PropTypes.number,
	expanded: PropTypes.bool,
	level: PropTypes.number,
	onClick: PropTypes.func
};

ToggleButton.defaultProps = {
	expanded: false,
	level: 0
};
