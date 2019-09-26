import React, { useCallback, useReducer, useState } from 'react';
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
	onExpandNode,
	onNodeClick,
	tree,
	subtitle,
	...props
}) => { 
	const [convertedTree, setConvertedTree] = useState(convertTree([tree]), []);

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
	const [loadingNodeId, setLoadingNodeId] = useState('');

	const toggleChildVisibility = useCallback(({ index, node }) => {
		// deselect nodes if collapsing and close opened button menus
		if (state.selectedNodeIndex > index && state.selectedNodeIndex <= index + node.descendants) {
			console.log('dispatchign removing select', index, state.selectedNodeIndex);
			dispatch({ type: 'selectNode', nodeIndex: -1 });
		} else {
			dispatch({ type: 'openButtonMenu', nodeIndex: -1 });
		}

		// collapsing node
		if (node.expanded) {
			if (index < state.selectedNodeIndex) {
				console.log('dispatchign moving select', index, state.selectedNodeIndex);
				dispatch({
					type: 'selectNode',
					nodeIndex: state.selectedNodeIndex - convertedTree[index].descendants
				});
			}

			setConvertedTree(collapseNode({ parentIndex: index, tree: convertedTree }));

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
						type: 'selectNode',
						nodeIndex: state.selectedNodeIndex + nodesToAppend.length
					});
				}

				setConvertedTree(expandNode({
					nodesToAppend,
					parentIndex: index,
					tree: convertedTree
				}));

				setLoadingNodeId('');
			});
		// expanding node with list of children attached to node
		} else {
			node = findNode(tree, node);
			const nodesToAppend = node.children || [];

			if (index < state.selectedNodeIndex) {
				dispatch({
					type: 'selectNode',
					nodeIndex: state.selectedNodeIndex + nodesToAppend.length
				});
			}

			setConvertedTree(expandNode({
				nodesToAppend,
				parentIndex: index,
				tree: convertedTree
			}));
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
};

Tree.defaultProps = {
	canDrag: false,
	customButtons: [],
	customHandle: null,
	isVirtualized: false,
	onExpandNode: null,
	tree: {},
	subtitle: null
};
