import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';

import { Handler } from './Handler';
import { ToggleButton } from './ToggleButton';
import { Node } from './Node';
import { Scaffold } from './Scaffold';

const NODE_DRAG_TYPE = 'NODE_DRAG';

export const Row = ({
	buttonMenuIndex,
	canDrag,
	clickable,
	customButtons,
	customHandle,
	dispatch,
	index,
	loading,
	nodeStyle,
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

	let collectedProps;
	let drag;
	let preview;

	if (canDrag) {
		[collectedProps, drag, preview] = useDrag({
			item: { id: tree[index].id, type: NODE_DRAG_TYPE }
		});
	}

	let NodeComponent = null;

	if (canDrag) {
		NodeComponent = preview(
			<Fragment>
				<Handler
					canDrag={canDrag}
					customHandle={customHandle}
					drag={drag}
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
					nodeStyle={nodeStyle}
					selected={selectedNodeIndex === index}
					subtitle={subtitle || tree[index].subtitle}
					title={title}
				/>
			</Fragment>
		);
	} else {
		NodeComponent = (
			<Fragment>
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
					nodeStyle={nodeStyle}
					selected={selectedNodeIndex === index}
					subtitle={subtitle || tree[index].subtitle}
					title={title}
				/>
			</Fragment>
		);
	}

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
			{ NodeComponent }
		</div>
	);
};
