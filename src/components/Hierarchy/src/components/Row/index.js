import React, { Fragment, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Handler } from './Handler';
import { ToggleButton } from './ToggleButton';

export const Row = ({
	canDrag,
	customHandle,
	index,
	onNodeClick,
	style,
	toggleChildVisibility,
	tree
}) => {
	const { childrenCount, expanded, id, level, parent, title, subtitle } = tree[index];
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(false);

	const onToggleChildVisibility = useCallback(() => {
		if (typeof toggleChildVisibility === 'function') {
			setLoading(true);

			new Promise((resolve, reject) => {
				resolve(toggleChildVisibility({ index, node: tree[index] }));
			}).then(() => {
				setLoading(false);
			});
		}
	});

	const scaffold = new Array(level + 1).fill(null).map((val, i) => {
		let currentLevel = level;
		let currentNode = tree[index];

		// need to get the ancestor for the node at the level being processed
		// for the scaffolding
		while (currentLevel !== i) {
			currentNode = tree[currentNode.parent];
			currentLevel--;
		}

		const isVertical = !!currentNode && currentNode.hasSibling;

		const classes = classNames({
			'mui-line-block': true,
			'mui-line-half-horizontal-right': i === level,
			'mui-line-half-vertical-top': !isVertical && i === level && i > 0,
			'mui-line-full-vertical': isVertical
		});

		return <div className={classes} />;
	});

	const contentClasses = classNames({
		'mui-node-content': true,
		'mui-node-selected': !!selected,
		'mui-node-clickable': typeof onNodeClick === 'function'
	});

	return (
		<div
			className="mui-node-row"
			style={style}
		>
			<ToggleButton
				childrenCount={childrenCount}
				expanded={expanded}
				level={level}
				onClick={onToggleChildVisibility}
			/>
			{scaffold}
			<Handler
				canDrag={canDrag}
				customHandle={customHandle}
				loading={loading}
				node={tree[index]}
			/>
			<div
				className={contentClasses}
				onClick={() => {
					if (typeof onNodeClick === 'function') {
						setSelected(!selected);
						onNodeClick(tree[index]);
					}
				}}
			>
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
