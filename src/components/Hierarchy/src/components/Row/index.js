import React, { useRef, useCallback } from 'react';
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
	nodeStyle,
	onDrop,
	onHover,
	onExpandNode,
	selectedNodeIndex,
	style,
	subtitle,
	toggleChildVisibility,
	tree
}) => {

	const { isDragging, childrenCount, expanded, id, level, parent, title } = tree[index];

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
				<Node
					buttonMenuIndex={buttonMenuIndex}
					canDrag={canDrag}
					clickable={clickable}
					customButtons={customButtons}
					customHandle={customHandle}
					dispatch={dispatch}
					loading={loading}
					node={tree[index]}
					nodeIndex={index}
					nodeStyle={nodeStyle}
					onDrop={onDrop}
					onHover={onHover}
					selected={selectedNodeIndex === index}
					subtitle={subtitle || tree[index].subtitle}
					title={title}
				/>
		</div>
	);
};
