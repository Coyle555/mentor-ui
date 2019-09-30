import React, { useCallback, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { Row } from './components/Row';
import { collapseNode, convertTree, expandNode, findNode } from './utils';

import './styles.less';

const ROW_HEIGHT = 62;

const initialState = {
	buttonMenuIndex: -1,
	loadingNodeIds: [],
	selectedNodeIndex: -1,
};

export const Tree = ({
	canDrag,
	customButtons,
	customHandle,
	isVirtualized,
	nodeStyle,
	onExpandNode,
	onNodeClick,
	onTreeChange,
	tree,
	subtitle,
	...props
}) => { 
	const afterTreeChange = useCallback((tree) => {
		if (typeof onTreeChange === 'function') {
			onTreeChange(tree);
		}
	}, [onTreeChange]);

	const [convertedTree, setConvertedTree] = useState(() => {
		const initialTree = convertTree([tree]);
		afterTreeChange(initialTree);

		return initialTree;
	});

	useEffect(() => {
		const newTree = convertTree([tree]);
		setConvertedTree(newTree);
		afterTreeChange(newTree);
	}, [tree]);

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

			case 'updateNodeIndex':

				return { ...state, selectedNodeIndex: action.nodeIndex };

			case 'openButtonMenu':
				let newButtonIndex = -1;

				if (state.buttonMenuIndex !== action.nodeIndex) {
					newButtonIndex = action.nodeIndex;
				}

				return { ...state, buttonMenuIndex: newButtonIndex };

			default:
				return state;
		}
	});

	const [state, dispatch] = useReducer(reducer, initialState);
	const [loadingNodeId, setLoadingNodeId] = useState('');

	const toggleChildVisibility = useCallback(({ index, node }) => {
		// deselect nodes if collapsing and close opened button menus
		if (state.selectedNodeIndex > index && state.selectedNodeIndex <= index + node.descendants) {
			dispatch({ type: 'selectNode', nodeIndex: -1 });
		} else {
			dispatch({ type: 'openButtonMenu', nodeIndex: -1 });
		}

		// collapsing node
		if (node.expanded) {
			if (state.selectedNodeIndex > index + node.descendants) {
				dispatch({
					type: 'updateNodeIndex',
					nodeIndex: state.selectedNodeIndex - convertedTree[index].descendants
				});
			}

			const newTree = collapseNode({ parentIndex: index, tree: convertedTree });
			setConvertedTree(newTree);
			afterTreeChange(newTree);

		// expanding node with a function
		} else if (typeof onExpandNode === 'function') {
			// wait for a previous loading request to complete before making another request
			if (!!loadingNodeId) return;

			new Promise((resolve, reject) => {

				setLoadingNodeId(node.id);
				resolve(onExpandNode(node));

			}).then(nodesToAppend => {
				if (index < state.selectedNodeIndex) {
					dispatch({
						type: 'updateNodeIndex',
						nodeIndex: state.selectedNodeIndex + nodesToAppend.length
					});
				}

				const newTree = expandNode({
					nodesToAppend,
					parentIndex: index,
					tree: convertedTree
				});

				setConvertedTree(newTree);
				afterTreeChange(newTree);
				setLoadingNodeId('');
			});
		// expanding node with list of children attached to node
		} else {
			node = findNode(tree, node);
			const nodesToAppend = node.children || [];

			if (index < state.selectedNodeIndex) {
				dispatch({
					type: 'updateNodeIndex',
					nodeIndex: state.selectedNodeIndex + nodesToAppend.length
				});
			}

			const newTree = expandNode({
				nodesToAppend,
				parentIndex: index,
				tree: convertedTree
			});
			setConvertedTree(newTree);
			afterTreeChange(newTree);
		}
	});

	const renderRow = useCallback(({ index, style, ...props }) => (
		<Row
			buttonMenuIndex={state.buttonMenuIndex}
			canDrag={canDrag}
			clickable={typeof onNodeClick === 'function'}
			customButtons={customButtons}
			customHandle={customHandle}
			dispatch={dispatch}
			index={index}
			loading={convertedTree[index].id === loadingNodeId}
			key={props.key}
			nodeStyle={nodeStyle}
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
	nodeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	onExpandNode: PropTypes.func,
	onNodeClick: PropTypes.func,
	onTreeChange: PropTypes.func,
	tree: PropTypes.object,
	subtitle: PropTypes.func
};

Tree.defaultProps = {
	canDrag: false,
	customButtons: [],
	customHandle: null,
	isVirtualized: false,
	nodeStyle: {},
	onExpandNode: null,
	onNodeClick: null,
	onTreeChange: null,
	tree: {},
	subtitle: null
};
