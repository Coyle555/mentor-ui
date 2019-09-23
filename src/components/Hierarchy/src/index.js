import React, { useCallback, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { Row } from './components/Row';
import {
	collapseNode,
	convertTree,
	expandNode 
} from './utils';

import './styles.less';

const ROW_HEIGHT = 62;

const initialState = {
	selectedNodeIndex: -1,
	buttonMenuIndex: -1
};

export const Tree = ({
	canDrag,
	customButtons,
	customHandle,
	isVirtualized,
	onExpandNode,
	onNodeClick,
	tree,
	subtitle,
	...props
}) => { 
	const [convertedTree, setConvertedTree] = useState(convertTree(tree), [tree]);

	const reducer = useCallback((state, action) => {
		switch (action.type) {
			case 'selectNode':
				let newIndex = -1;

				if (state.selectedNodeIndex !== action.nodeIndex) {
					newIndex = action.nodeIndex;
				}

				if (typeof onNodeClick === 'function') {
					onNodeClick(newIndex > -1 ? convertedTree[newIndex] : null);
				}

				return {
					...state,
					buttonMenuIndex: -1,
					selectedNodeIndex: newIndex
				};

			case 'openButtonMenu':
				let newButtonIndex = -1;

				if (state.buttonMenuIndex !== action.nodeIndex) {
					newButtonIndex = action.nodeIndex;
				}

				return { ...state, buttonMenuIndex: newButtonIndex };
			default:
				return state;
		}
	}, []);

	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleChildVisibility = useCallback(({ index, node }) => {
		// collapsing node
		if (node.expanded) {
			setConvertedTree(collapseNode({ parentIndex: index, tree: convertedTree }));
		// expanding node
		} else if (typeof onExpandNode === 'function') {
			const nodesToAppend = onExpandNode(node);

			setConvertedTree(expandNode({
				nodesToAppend,
				parentIndex: index,
				tree: convertedTree
			}));
		}
	});

	const renderRow = useCallback(({ index, style }) => (
		<Row
			buttonMenuIndex={state.buttonMenuIndex}
			canDrag={canDrag}
			clickable={typeof onNodeClick === 'function'}
			customButtons={customButtons}
			customHandle={customHandle}
			dispatch={dispatch}
			index={index}
			selectedNodeIndex={state.selectedNodeIndex}
			style={style}
			toggleChildVisibility={toggleChildVisibility}
			tree={convertedTree}
		/>
	));

	if (isVirtualized) {
		return (
			<div style={{ height: '100%' }}>
				<AutoSizer>
					{({ height, width }) => (
						<List
							className="mui-hierarchy-node"
							height={height}
							itemCount={convertedTree.length}
							itemSize={ROW_HEIGHT}
							itemKey={index => convertedTree[index].id}
							width={width}
						>
							{renderRow}
						</List>
					)}
				</AutoSizer>
			</div>
		);
	}

	return (
		<div className="mui-hierarchy-node" style={{ height: '100%' }}>
			{ convertedTree.map((node, index) => (
				renderRow({ index, key: node.id, style: { height: ROW_HEIGHT } })
			))}
		</div>
	);
}

Tree.propTypes = {
	canDrag: PropTypes.bool,
	customButtons: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.func
	]),
	customHandle: PropTypes.func,
	isVirtualized: PropTypes.bool,
	onExpandNode: PropTypes.func,
	tree: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	canDrag: false,
	customButtons: [],
	customHandle: null,
	isVirtualized: true,
	onExpandNode: null,
	tree: [],
	subtitle: null
};
