import React, { PureComponent, Fragment, useCallback } from 'react';
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
	loading,
	onExpandNode,
	selectedNodeIndex,
	style,
	subtitle,
	toggleChildVisibility,
	tree
}) => {
	const { childrenCount, expanded, id, level, parent, title } = tree[index];

	const onToggleChildVisibility = useCallback(() => {
		toggleChildVisibility({ index, node: tree[index] });
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
				loading={loading}
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
