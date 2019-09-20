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
	isVirtualized,
	onExpandNode,
	onNodeClick,
	tree,
	subtitle
}) => { 

	const [convertedTree, setConvertedTree] = useState(convertTree(tree), [tree]);
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

	const renderRow = useCallback(({ index, style }) => (
		<Row
			canDrag={canDrag}
			index={index}
			onNodeClick={onNodeClick}
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
	isVirtualized: PropTypes.bool,
	onExpandNode: PropTypes.func,
	tree: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	canDrag: false,
	isVirtualized: true,
	onExpandNode: null,
	tree: [],
	subtitle: null
};
