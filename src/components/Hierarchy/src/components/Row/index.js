import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Row = ({
	childrenCount,
	expanded,
	level,
	hasSibling,
	isRoot,
	node,
	title,
	style,
	subtitle
}) => {
	const [loading, setLoading] = useState(false);

	/*const onToggleChildVisibility = useCallback(() => {
		if (typeof children === 'function') {
			toggleC
	});*/

	let scaffold = [];

	for (let i = 0; i < level; i++) {
		scaffold.push(<div className="mui-line-block" />);
	}

	const branchClasses = classNames({
		'mui-line-block mui-line-half-horizontal-right': true,
		'mui-line-half-vertical-top': !hasSibling && !isRoot,
		'mui-line-full-vertical': hasSibling && !isRoot
	});

	return (
		<div
			className="mui-node-row"
			style={style}
		>
			{ childrenCount > 0 && (
				<button
					className={classNames(
						expanded 
							? 'node-collapse-button'
							: 'node-expand-button'
					)}
					type="button"
				>
					{ expanded
						? <i className="fas fa-minus" />
						: <i className="fas fa-plus" />
					}
				</button>
			)}
			{scaffold}
			<div className={branchClasses} />
			<div className="mui-node-handler">
				<div className="node-handler">
					<i className="far fa-bars fa-lg" />
				</div>
			</div>
			<div className="mui-node-content">
				<div className="node-text-title">
					{title}
				</div>
				<div className="node-text-subtitle">
					{ typeof subtitle === 'function'
						? subtitle(node)
						: subtitle || ''
					}
				</div>
			</div>
		</div>
	);
};

Row.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
