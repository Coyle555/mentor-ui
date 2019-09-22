import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Node = ({ node, onNodeClick, selected, subtitle, title }) => {
	const nodeClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': selected,
		'mui-node-clickable': typeof onNodeClick === 'function'
	});

	return (
		<div
			className={nodeClasses}
			onClick={() => { onNodeClick(node) }}
		>
			<div className="node-text-title">
				{title}
			</div>
			<div className="node-text-subtitle">
				{ typeof subtitle === 'function'
					? subtitle(node)
					: subtitle
				}
			</div>
		</div>
	);
};

Node.propTypes = {
	node: PropTypes.object,
	onNodeClick: PropTypes.func,
	selected: PropTypes.bool,
	subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	title: PropTypes.string
};

Node.defaultProps = {
	selected: false,
	subtitle: '',
	title: ''
};
