import React, { useCallback, useState } from 'react';
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

export const Tree = ({
	canDrag,
	customButtons,
	customHandle,
	isVirtualized,
	onExpandNode,
	tree,
	subtitle,
	...props
}) => { 
	const [convertedTree, setConvertedTree] = useState(convertTree(tree), [tree]);
	const [selectedNodeId, setSelectedNodeId] = useState('');

	const toggleChildVisibility = useCallback(({ index, node }) => {
		// collapsing node
		if (node.expanded) {
			setConvertedTree(collapseNode({ tree: convertedTree, node, index }));
		// expanding node
		} else if (typeof onExpandNode === 'function') {
			const nodesToAppend = onExpandNode(node);

			setConvertedTree(expandNode({
				index,
				node,
				nodesToAppend,
				tree: convertedTree
			}));
		}
	});

	const onNodeClick = useCallback((node) => {
		const newSelectedNodeId = selectedNodeId === node.id ? '' : node.id;

		setSelectedNodeId(newSelectedNodeId);

		if (typeof props.onNodeClick === 'function') {
			props.onNodeClick(node, !!newSelectedNodeId);
		}
	});

	const renderRow = useCallback(({ index, style }) => (
		<Row
			canDrag={canDrag}
			customButtons={customButtons}
			customHandle={customHandle}
			index={index}
			onNodeClick={onNodeClick}
			selectedNodeId={selectedNodeId}
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
	customButtons: PropTypes.arrayOf(PropTypes.element),
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
