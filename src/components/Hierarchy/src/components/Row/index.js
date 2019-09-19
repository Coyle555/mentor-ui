import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Row = ({ index, style, tree }) => {
	const { childrenCount, expanded, id, level, parent, title, subtitle } = tree[index];
	const [loading, setLoading] = useState(false);

	/*const onToggleChildVisibility = useCallback(() => {
		if (typeof children === 'function') {
			toggleC
	});*/

	const scaffold = new Array(level + 1).fill(null).map((val, i) => {
		let currentLevel = level;
		let currentNode = tree[index];

		// need to get the ancestor for the node at the level being processed
		// for the scaffolding
		while (currentLevel !== i) {
			currentNode = currentNode.parent;
			currentLevel--;
		}

		const isVertical = !!currentNode && currentNode.hasSibling;

		const classes = classNames({
			'mui-line-block': true,
			'mui-line-half-horizontal-right': i === level,
			'mui-line-half-vertical-top': !isVertical && i === level,
			'mui-line-full-vertical': isVertical
		});

		return <div className={classes} />;
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
					style={{ left: 22 + (44 * level) + 'px' }}
					type="button"
				>
					{ expanded
						? <i className="fas fa-minus" />
						: <i className="fas fa-plus" />
					}
				</button>
			)}
			{scaffold}
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