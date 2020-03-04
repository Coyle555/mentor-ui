import React, { useCallback, useEffect, useReducer, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { cloneDeep } from 'lodash';

import { Row } from './components/Row';
import { collapseNode, convertTree, expandNode, findNode, reducer } from './utils';

import './styles.less';

//const workerPath = new URL('./worker', window.location.origin)
const worker = new Worker('./worker.js', { type: 'module' });

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
	onNodeDrop,
	onExpandNode,
	onNodeClick,
	onTreeChange,
	tree,
	subtitle,
	...props
}) => { 

	const [state, dispatch] = useReducer(reducer, initialState);
	const [loadingNodeId, setLoadingNodeId] = useState('');

	const mutatedTree = useRef(null);

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

	const onDrop = useCallback((prevIndex, newIndex, droppedOnNode) => {
		const droppedId = convertedTree[prevIndex].id;
		let newParentId;

		if (droppedOnNode) {
			// dropped directly on a node. make that node count as the new parent
			newParentId = convertedTree[newIndex].id;
			//update the ui to show the dragged node is a child of the hovered node now

			worker.postMessage({
				tree: mutatedTree.current,
				draggedNode: convertedTree[prevIndex], 
				hoveredNode: convertedTree[newIndex],
				droppedOnNewParent: true,				
			});
		} else {
			newParentId = convertedTree[convertedTree[newIndex].parent].id;

			// dropped in a slot above a node 
			// make the node below a sibling by grabbing the parent id
		}

		if (typeof onNodeDrop === 'function') {
			
			onNodeDrop(droppedId, newParentId)
		}
		// console.log({ newParentId });
	}, [convertedTree]);

	const onHover = useCallback((prevIndex, newIndex) => {
		let draggedNode = convertedTree[prevIndex];
		const hoveredNode = convertedTree[newIndex];

		if (!draggedNode || !hoveredNode) {
			console.log({ prevIndex, newIndex, convertedTree });
			return;
		}

		if (state.draggedId !== draggedNode.id) {
			//console.log('drag id changed somehow??', state.draggedId, draggedNode.id);

			const actualIndex = convertedTree.findIndex(v => v.id === state.draggedId);
			if (actualIndex === -1) {
				console.log('couldnt find node in convertedTree array with id', state.draggedId);
				return;	
			}			
			console.log('expected node at index', actualIndex, 'instead of', prevIndex);
			/*
				confusing behavior occurs at seemingly random times. the onHover function fires twice 
				on a second node during a single drag, 
				so as a temporary patch Im tracking the id of the node getting dragged
				to prevent this 
			*/	

			draggedNode = convertedTree[actualIndex];
		}
		
		if (draggedNode && hoveredNode) {
			worker.postMessage({ 
				tree: cloneDeep(mutatedTree.current),
				draggedNode: draggedNode, 
				hoveredNode: hoveredNode
			});
		}

	
	}, [convertedTree, state.draggedId]);

	useEffect(() => {
		//console.log('New tree value received', tree);
		mutatedTree.current = tree;

		const newTree = convertTree([tree]);
		setConvertedTree(newTree);
		afterTreeChange(newTree);
	}, [tree]);

	useEffect(() => {
		worker.onmessage = function(e) {
			const [ newTree, newConvertedTree ] = e.data;
			mutatedTree.current = newTree;
			setConvertedTree(newConvertedTree);
			afterTreeChange(newConvertedTree);			
		}
	}, []);

	const selectNode = useCallback((nodeIndex) => {

		if (typeof onNodeClick === 'function') {
			onNodeClick(convertedTree[nodeIndex]);
		}

		dispatch({ type: 'selectNode', nodeIndex });

	}, [onNodeClick, state.selectedNodeIndex]);


	const toggleChildVisibility = ({ index, node }) => {
		// deselect nodes if collapsing and close opened button menus
		if (state.selectedNodeIndex > index && state.selectedNodeIndex <= index + node.descendants) {
			selectNode(-1);
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
	};

	const renderRow = ({ index, style, ...props }) => (
		<Row
			buttonMenuIndex={state.buttonMenuIndex}
			canDrag={canDrag}
			clickable={typeof onNodeClick === 'function'}
			customButtons={customButtons}
			customHandle={customHandle}
			dispatch={dispatch}
			draggedId={state.draggedId}
			index={index}
			loading={convertedTree[index].id === loadingNodeId}
			key={props.key}
			nodeStyle={nodeStyle}
			onDrop={onDrop}
			onHover={onHover}
			onExpandNode={onExpandNode}
			selectNode={selectNode}
			selectedNodeIndex={state.selectedNodeIndex}
			style={style}
			subtitle={subtitle}
			toggleChildVisibility={toggleChildVisibility}
			tree={convertedTree}
		/>
	);

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
