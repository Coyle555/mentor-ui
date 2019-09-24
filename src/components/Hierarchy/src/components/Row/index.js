import React, { Fragment, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Handler } from './Handler';
import { ToggleButton } from './ToggleButton';
import { Node } from './Node';
import { Scaffold } from './Scaffold';

export const Row = ({
	buttonMenuIndex,
	canDrag,
	clickable,
	customButtons,
	customHandle,
	dispatch,
	index,
	onExpandNode,
	selectedNodeIndex,
	style,
	subtitle,
	toggleChildVisibility,
	tree
}) => {
	const { childrenCount, expanded, id, level, parent, title } = tree[index];
	const [loading, setLoading] = useState(false);

	const onToggleChildVisibility = useCallback(() => {
		// collapse row
		if (expanded) {
			toggleChildVisibility({ index, node: tree[index] });
		// expand row
		} else if (typeof onExpandNode === 'function') {
			setLoading(true);

			new Promise((resolve, reject) => {
				resolve(toggleChildVisibility({
					index,
					node: tree[index]
				}));
			}).then(() => {
				setLoading(false);
			});
		} else {
			toggleChildVisibility({ index, node: tree[index] });
		}
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
			<Scaffold
				level={level}
				nodeIndex={index}
				tree={tree}
			/>
			<Handler
				canDrag={canDrag}
				customHandle={customHandle}
				loading={loading}
				node={tree[index]}
			/>
			<Node
				buttonMenuIndex={buttonMenuIndex}
				clickable={clickable}
				customButtons={customButtons}
				dispatch={dispatch}
				node={tree[index]}
				nodeIndex={index}
				selected={selectedNodeIndex === index}
				subtitle={subtitle || tree[index].subtitle}
				title={title}
			/>
		</div>
	);
};
