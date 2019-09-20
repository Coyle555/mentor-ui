import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { Row } from './components/Row';
import { convertTree } from './utils/convertTree';

import './styles.less';

const ROW_HEIGHT = 62;

export const Tree = ({ isVirtualized, tree, subtitle }) => { 

	const convertedTree = useMemo(() => convertTree(tree), [tree]);

	const renderRow = useCallback(({ index, key, style }) => (
		<Row
			index={index}
			key={key}
			style={style}
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
							rowCount={convertedTree.length}
							rowHeight={ROW_HEIGHT}
							rowRenderer={renderRow}
							width={width}
						/>
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
	tree: PropTypes.array,
	subtitle: PropTypes.func
}

Tree.defaultProps = {
	isVirtualized: true,
	tree: [],
	subtitle: null
};
