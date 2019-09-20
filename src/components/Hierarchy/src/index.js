import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { Row } from './components/Row';
import { convertTree } from './utils/convertTree';
import { collapseNode } from './utils/collapseNode';
import { expandNode } from './utils/expandNode';

import './styles.less';

const ROW_HEIGHT = 62;

export const Tree = ({ isVirtualized, onNodeClick, onToggleChildVisibility, tree, subtitle }) => { 

	const [convertedTree, setConvertedTree] = useState(convertTree(tree), [tree]);
	console.log(convertedTree);
	const toggleChildVisibility = useCallback(({ index, node }) => {
		// collapsing node
		if (node.expanded) {
			setConvertedTree(collapseNode({ tree: convertedTree, node, index }));
		// expanding node
		} else {
			if (typeof onToggleChildVisibility === 'function') {
				onToggleChildVisibility(node);
			}

			setConvertedTree(expandNode({
				index,
				node,
				originalTree: tree,
				tree: convertedTree,
			}));
		}
	});

	const renderRow = useCallback(({ index, style }) => (
		<Row
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
	isVirtualized: PropTypes.bool,
	onToggleChildVisibility: PropTypes.func,
	tree: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	isVirtualized: true,
	onToggleChildVisibility: null,
	tree: [],
	subtitle: null
};
