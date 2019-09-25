import React, { useCallback, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { Row } from './components/Row';
import {
	collapseNode,
	convertTree,
	expandNode,
	findNode
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
	const [convertedTree, setConvertedTree] = useState(convertTree([tree]), [tree]);

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
		// deselect nodes and close open button menus
		if (state.selectedNodeIndex > index && state.selectedNodeIndex <= index + node.descendants) {
			dispatch({ type: 'selectNode', nodeIndex: -1 });
		} else {
			dispatch({ type: 'openButtonMenu', nodeIndex: -1 });
		}

		// collapsing node
		if (node.expanded) {
			setConvertedTree(collapseNode({ parentIndex: index, tree: convertedTree }));
		// expanding node with a function
		} else if (typeof onExpandNode === 'function') {
			new Promise((resolve, reject) => {

				resolve(onExpandNode(node));

			}).then(nodesToAppend => {
				setConvertedTree(expandNode({
					nodesToAppend,
					parentIndex: index,
					tree: convertedTree
				}));
			});
		// expanding node with list of children attached to node
		} else {
			node = findNode(tree, node);

			setConvertedTree(expandNode({
				nodesToAppend: node.children || [],
				parentIndex: index,
				tree: convertedTree
			}));
		}
	});

	const renderRow = useCallback(({ index, key, style }) => (
		<Row
			buttonMenuIndex={state.buttonMenuIndex}
			canDrag={canDrag}
			clickable={typeof onNodeClick === 'function'}
			customButtons={customButtons}
			customHandle={customHandle}
			dispatch={dispatch}
			index={index}
			key={key}
			onExpandNode={onExpandNode}
			selectedNodeIndex={state.selectedNodeIndex}
			style={style}
			subtitle={subtitle}
			toggleChildVisibility={toggleChildVisibility}
			tree={convertedTree}
		/>
	));

	if (isVirtualized) {
		return (
			<div className="mui-hierarchy-container">
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
		<div className="mui-hierarchy-container">
			<div className="mui-hierarchy-node">
				{ convertedTree.map((node, index) => (
					renderRow({
						index,
						key: node.id,
						style: {
							height: ROW_HEIGHT,
							left: 0,
							top: index * ROW_HEIGHT + 'px',
						}
					})
				))}
			</div>
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
	tree: PropTypes.object,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	canDrag: false,
	customButtons: [],
	customHandle: null,
	isVirtualized: false,
	onExpandNode: null,
	tree: {},
	subtitle: null
};
